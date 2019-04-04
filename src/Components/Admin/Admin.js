import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EventName from "./Stepper/EventName";
import AddHeroImage from "./Stepper/AddHeroImage";
import SelectProduct from "./Stepper/SelectProduct";
import OpenTok from "./../OpenTok/OpenTok";
import { v4 as randomString } from "uuid";
import axios from "axios";
import { connect } from 'react-redux';
import { updateUser } from './../../ducks/user'
import './Admin.scss';





const styles = theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      apiKey: "",
      sessionId: "",
      token: "",
      product: {},
      products: [],
      name: "",
      imageId: "",
      isUploading: false,
      url: "http://via.placeholder.com/450x450"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get("/products").then(res => {
      // console.log(res.data.data)
      // console.log("quest",res.data.data[0].relationships.main_image.data.id)
      // let imgId = res.data.data.relationships.main_image.data.id.link.href
      this.setState({
        products: res.data.data,
        imageId: res.data.data[0].relationships.main_image.data.id
      });
    });
  }

  componentWillMount(){
    const {id, admin} = this.props;
    if(!admin){
        axios.get('/user/fetchuser')
        .then(res => {
          if(res.data.admin === true){
            this.props.updateUser(res.data);
          } else {
            this.props.history.push('/login');
          }
        })
        .catch(err => {
            this.props.history.push('/login');
        })
    } else if (admin === false) {
      this.props.history.push('/login');
      alert('Please log in with an admin account')
    } else {
  
    }

  }
  logout() {
    axios.post('/user/logout')
      .then(res => {
        console.log('logged out')
        this.props.updateUser({});
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err)
      })
  }

  logout(){
    axios.post('/user/logout')
    .then(res => {
      console.log('logged out')
      this.props.updateUser({});
      this.props.history.push('/');
    })
    .catch(err => {
        console.log(err)
    })
  }

  getSignedRequest = ([file]) => {
    console.log("hit");
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
  
    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });

        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        this.setState({
          isUploading: false
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  handleSelect = product => {
    product.selected = !product.selected;
    const index = this.state.products.findIndex(
      stateproduct => stateproduct.id === product.id
    );
    this.setState(prevState => {
      prevState.products.splice(index, 1, product);
      return {
        products: [...prevState.products]
      };
    });
    // document.getElementById('panel'+ id).classList.toggle('highlight') //*
    axios.get(`/products/${product.id}`).then(res => {
      // console.log("res",res.data.data.id)
      this.setState({
        product: res.data.data.id
      });
    });
  };

  handleNext = () => {
    const steps = this.getSteps();
    if (this.state.activeStep < steps.length - 1) {
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    } else {
      axios.get(`/startPublish`).then(res => {
        const { apiKey, sessionId, token } = res.data;
        this.setState({
          apiKey: apiKey,
          sessionId: sessionId,
          token: token,
          activeStep: this.state.activeStep + 1
        });
      });
    }
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getSteps = () => {
    return [
      "1. Input a Name For Shop Lime Event",
      "2. Select Product",
      "3. Add Hero Image",
      "4. Setup Broadcast"
    ];
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <EventName
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleChangeFn={this.handleChange}
          />
        );
      case 1:
        return (
          <SelectProduct
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            eventName={this.state.name}
            product={this.state.product}
            products={this.state.products}
            handleSelectFn={this.handleSelect}
          />
        );
      case 2:
        return <AddHeroImage 
        getSignedRequestFn={this.getSignedRequest} 
        isUploading={this.state.isUploading}
        />;
      case 3:
        return;
      default:
        return "Unknown step";
    }
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    console.log("Admin State", this.state)

    return (
      <div className="view">
      <div className={classes.root}>
        <div>
          Follow the steps below to create you Live Event
	        <Button variant="contained" color="secondary" onClick={() => { this.logout() }}>Logout</Button>
        </div>
        <img src={this.state.imageId.link.href} />
        {/* {this.state.imageId} */}
        {activeStep < steps.length && (
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography component={"span"}>
                    {this.getStepContent(index)}
                  </Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? "Preview" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <OpenTok
              apiKey={this.state.apiKey}
              sessionId={this.state.sessionId}
              token={this.state.token}
              product={this.state.product}
              streamName={this.state.name}
              products={this.state.products}
              imgUrl={this.state.url}
              logout={this.logout}
            />
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
          
        )}
        
      </div>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object
};

function mapStateToProps(state){
  const { id, admin } = state
  return {
      id,
      admin,
  };
};

const adminPermission = connect(mapStateToProps, {updateUser})(Admin);

export default withStyles(styles)(adminPermission);
