import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import './SelectProduct.scss';


const styles = theme => ({
    root: {
      width: '100%',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      textAlign: 'left'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      textAlign: 'left'
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'left',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  });

class AddProduct extends Component {

  constructor(props){
    super(props)

    this.state = {
      product: {},
      products: []
    }
  }

  // componentDidMount(){
  //   axios.get('/products')
  //   .then(res => {
  //     console.log(res.data.data)
  //     this.setState({
  //       products: res.data.data
  //     })
  //   })
  // }

  // handleSelect = (product) => {
  //   product.selected = !product.selected 
  //   const index = this.state.products.findIndex(stateproduct =>
  //   stateproduct.id === product.id)
  //   this.setState(prevState => {
  //     prevState.products.splice(index, 1, product)
  //     return {
  //     products: [
  //       ...prevState.products
  //     ],
  //   }});
  //   // document.getElementById('panel'+ id).classList.toggle('highlight') //*
  //   axios.get(`/products/${product.id}`)
  //   .then(res => {
  //     console.log("res",res.data.data.id)
  //     this.setState({
  //       product: res.data.data.id
  //     })
  //   })
  // }

  render() {
    const { classes, product, products, handleSelectFn } = this.props;
    console.log(this.state)
    return (
      <div>
        <div>{this.state.product.name}</div>
        {
          products.map(product => (
            <ExpansionPanel className = {product.selected && "highlight"}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>{product.name}</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>sku: {product.sku}</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column} />
                <div className={classes.column}>
                  <Typography variant="caption" style={{textAlign: 'left'}}>{product.description}</Typography>
                </div>
                {/* <div className={classNames(product.column, product.helper)}>
                  <Typography variant="caption">
                    Select your destination of choice
                    <br />
                    <a href="#sub-labels-and-columns" className={product.link}>
                      Learn more
                    </a>
                  </Typography>
                </div> */}
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                {/* <Button size="small">Cancel</Button> */}
                <Button size="small" color="primary" 
                  onClick={(e) => handleSelectFn(product)}>
                  Select Product
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))
        }
        <button onClick={() => {this.props.handleNext()}}>next</button>
      </div>
    )
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProduct);