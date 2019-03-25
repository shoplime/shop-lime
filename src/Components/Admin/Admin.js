import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EventName from './Stepper/EventName'
import EnterPrice from './Stepper/EnterPrice'
import SelectProduct from './Stepper/SelectProduct'
import OpenTok from './../OpenTok/OpenTok'
import axios from 'axios'




const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});


class Admin extends React.Component {
  state = {
    activeStep: 0,
    apiKey: '',
    sessionId: '',
    token: ''
  };
  
  handleNext = () => {
    const steps = this.getSteps();
    if (this.state.activeStep < steps.length - 1) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    } else {
      axios.get(`/startPublish`)
        .then(res => {
            const { apiKey, sessionId, token } = res.data
            console.log(res.data)
            this.setState({
              apiKey: apiKey,
              sessionId: sessionId,
              token: token,
              activeStep: this.state.activeStep + 1
            })
        })
    }
   
  };
  
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };
  
  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  
   getSteps = () => {
    return ['1. Input a Name For Shop Lime Event', '2. Select Product', '3. Setup Broadcast'];
  }
  
getStepContent = (step) => {
    switch (step) {
      case 0:
        return <EventName 
        handleNext={this.handleNext} 
        handleBack={this.handleBack}
        />;
      case 1:
        return <SelectProduct
        handleNext={this.handleNext} 
        handleBack={this.handleBack}
        />;
      case 2:
        return;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        {activeStep < steps.length && (

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{this.getStepContent(index)}</Typography>
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
                        {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
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
            <Typography>Preview</Typography>
            <OpenTok
            apiKey = {this.state.apiKey}
            sessionId = {this.state.sessionId}
            token = {this.state.token}
            />
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper> 
        )}
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Admin);