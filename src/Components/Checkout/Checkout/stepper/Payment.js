import React from 'react';
import { Field } from 'redux-form';

const Payment = (props) => {
    return(
      <span>
        <form
            className="checkout-form"
            noValidate
            onSubmit={props.handleSubmit}
            onKeyDown={props.handleKeyDown}>
            <fieldset className="payment collapsed">
                <div className="form-header inactive">
                  <h2>Payment details</h2>
                </div>
                <div className="form-content">
                  <div className="form-fields">
                    <label className="input-wrap name">
                      <span className="hide-content">First Name on card</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="First Name on card"
                        name="card_first_name"
                        type="text"
                        aria-label="First Name on card"
                      />
                    </label>
                    <label className="input-wrap name">
                      <span className="hide-content">Last Name on card</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Last Name on card"
                        name="card_last_name"
                        type="text"
                        aria-label="Last Name on card"
                      />
                    </label>
                    <label className="input-wrap card required">
                      <span className="hide-content">Card number</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Card number"
                        name="number"
                        maxLength="23"
                        type="tel"
                        aria-label="Card number"
                      />
                    </label>
                    <div className="input-wrap expiry-month">
                      <label className="select-fallback required">
                        <span className="hide-content">Card expiry month</span>
                        <Field
                        component="input"
                        required="required"
                        placeholder="Card expiry month"
                        maxLength="2"
                        name="month"
                        type="tel"
                        aria-label="expiry-month"
                      />
                      </label>
                    </div>
                    <div className="input-wrap expiry-year">
                      <label className="select-fallback required">
                        <span className="hide-content">Card expiry year</span>
                          <Field
                        component="input"
                        required="required"
                        placeholder="Expiry year"
                        maxLength="4"
                        name="year"
                        type="tel"
                        aria-label="expiry-year"
                      />
                      </label>
                    </div>
                    <label className="input-wrap cvc required">
                      <span className="hide-content">CVC code</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="CVC"
                        maxLength="4"
                        name="card_cvc"
                        type="tel"
                        aria-label="CVC"
                      />
                    </label>
                  </div>
                  <button type="submit" className="pay" aria-live="polite">
                    <span className="copy">Pay</span>
                  </button>
                </div>
              </fieldset>
        </form>
      </span>
    )
}

export default Payment