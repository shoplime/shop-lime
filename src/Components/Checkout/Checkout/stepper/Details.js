import React from 'react';
import { Field } from 'redux-form';

const Details = (props) => {
    return(
      <span>
        <form
            className="checkout-form"
            noValidate
            onSubmit={props.handleSubmit}
            onKeyDown={props.handleKeyDown}>
              <fieldset className="details border">
                <div className="form-header">
                  <h2>Your Details</h2>
                </div>
                <div className="form-content">
                  <div className="form-fields">
                    <label className="input-wrap name required">
                      <span className="hide-content">Name: </span>
                      <Field
                        component="input"
                        className="name"
                        required="required"
                        placeholder="Name"
                        name="name"
                        type="text"
                        aria-label="Name"
                      />
                    </label>
                    <label className="input-wrap email required">
                      <span className="hide-content">Email address: </span>
                      <Field
                        component="input"
                        className="email"
                        required="required"
                        placeholder="Email address"
                        name="email"
                        type="email"
                        aria-label="Email"
                      />
                    </label>
                  </div>
                </div>
            </fieldset>
        </form>
      </span>
    )
}

export default Details