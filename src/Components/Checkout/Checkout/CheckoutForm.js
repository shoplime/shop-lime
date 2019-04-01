import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as api from '../../../moltin';
// import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { SUBMIT_PAYMENT, PAYMENT_COMPLETE } from '../../../ducks/payments';

// Material-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Import Components
import CheckoutSummary from './CheckoutSummary';
import Details from './stepper/Details';
import Billing from './stepper/Billing';
import Shipping from './stepper/Shipping';
import Payment from './stepper/Payment';

function mapStateToProps(state) {
  return { push: state.push };
}

var CheckoutTemplate = {
  customer: {
    name: 'John Doe',
    email: 'john@doe.co'
  },
  shipping_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  },
  billing_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  }
};
var PaymentTemplate = {
  gateway: 'stripe',
  method: 'purchase',
  first_name: 'John',
  last_name: 'Doe',
  number: '4242424242424242',
  month: '08',
  year: '2020',
  verification_value: '123'
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Your Details', 'Billing', 'Shipping', 'Payment'];
}


class CheckoutForm extends Component {

  state = {
    activeStep: 0
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Details className={this.props.classes.instructions} handleSubmit={this.props.handleSubmit(this.mySubmit)} handleKeyDown={e => this.handleKeyDown(e)} />;
      case 1:
        return <Billing className={this.props.classes.instructions} handleSubmit={this.props.handleSubmit(this.mySubmit)} handleKeyDown={e => this.handleKeyDown(e)} />;
      case 2:
        return <Shipping className={this.props.classes.instructions} handleSubmit={this.props.handleSubmit(this.mySubmit)} handleKeyDown={e => this.handleKeyDown(e)} />;
      case 3:
        return <Payment className={this.props.classes.instructions} handleSubmit={this.props.handleSubmit(this.mySubmit)} handleKeyDown={e => this.handleKeyDown(e)} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  handleKeyDown = function (e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
    }
  };

  mySubmit = values => {
    CheckoutTemplate.customer.name = values.name;
    CheckoutTemplate.customer.email = values.email;

    CheckoutTemplate.billing_address.first_name = values.billing_firstname;
    CheckoutTemplate.billing_address.last_name = values.billing_lastname;
    CheckoutTemplate.billing_address.line_1 = values.billing_address_1;
    CheckoutTemplate.billing_address.line_2 = values.billing_address_2;
    CheckoutTemplate.billing_address.city = values.billing_state;
    CheckoutTemplate.billing_address.county = values.billing_postcode;
    CheckoutTemplate.billing_address.country = values.billing_country;

    CheckoutTemplate.shipping_address.first_name = values.shipping_firstname;
    CheckoutTemplate.shipping_address.last_name = values.shipping_lastname;
    CheckoutTemplate.shipping_address.line_1 = values.shipping_address_1;
    CheckoutTemplate.shipping_address.line_2 = values.shipping_address_2;
    CheckoutTemplate.shipping_address.city = values.shipping_state;
    CheckoutTemplate.shipping_address.county = values.shipping_postcode;
    CheckoutTemplate.shipping_address.country = values.shipping_country;

    PaymentTemplate.first_name = values.card_first_name;
    PaymentTemplate.last_name = values.card_last_name;
    PaymentTemplate.number = values.number;
    PaymentTemplate.month = values.month;
    PaymentTemplate.year = values.year;
    PaymentTemplate.verification_value = values.card_cvc;
    console.log(CheckoutTemplate, PaymentTemplate)

    this.props.dispatch(dispatch => {
      dispatch({ type: SUBMIT_PAYMENT });
    });

    api
      .Checkout(CheckoutTemplate.customer, CheckoutTemplate.billing_address, CheckoutTemplate.shipping_address)

      .then(order => {
        console.log(order)
        api.OrderPay(order.data.id, PaymentTemplate);
        api.DeleteCart();
      })

      .then(() => {

        this.props.dispatch(dispatch => {
          dispatch({ type: PAYMENT_COMPLETE });
          // dispatch(push('/order-confirmation'));
        });
      })

      .catch(e => {
        console.log(e);
      })

      .catch(e => {
        console.log(e);
      })

      .catch(e => {
        console.log(e);
      })
      this.handleReset()
      this.props.toggleComplete()
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
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

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <main role="main" id="container" className="main-container push">
        <section className="checkout">
          <div className="content">
            <CheckoutSummary />

              <div className={classes.root}>

                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map(label => (
                    <Step key={label}>

                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>

                  {this.state.activeStep === steps.length ? (
                    <div>

                      <Typography className={classes.instructions}>All steps completed</Typography>
                      <Button onClick={this.handleReset}>Reset</Button>
                    </div>
                  ) : (
                      <div>

                        <Typography component={'span'}>{this.getStepContent(activeStep)}</Typography>
                        <div>
                          {activeStep === 0?<Button onClick={this.props.toggleCheckout}
                            className={classes.backButton}>Return</Button>:<Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.backButton}
                          >
                            Back
                          </Button>}
                          {activeStep === steps.length - 1 ? <Button variant="contained" color="primary" onClick={this.props.handleSubmit(this.mySubmit)} type="submit" className="pay" aria-live="polite">
                          Pay
                          </Button>:
                          <Button variant="contained" color="primary" onClick={this.handleNext}>
                            Next
                          </Button>}
                        </div>
                      </div>
                    )}
                </div>
              </div>
          </div>
        </section>
      </main>
    );
  }
}

CheckoutForm = reduxForm({
  form: 'CheckoutForm'
})(CheckoutForm);


const CheckoutStepper = connect(mapStateToProps)(CheckoutForm);

CheckoutForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckoutStepper);