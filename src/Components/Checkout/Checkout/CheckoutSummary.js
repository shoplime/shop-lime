import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutItems from './CheckoutItems';

import { FETCH_PRODUCTS_START, FETCH_PRODUCTS_END } from '../../../ducks/products';
import { FETCH_CART_START, FETCH_CART_END } from '../../../ducks/cart';

var api = require('../../../moltin.js');

function mapStateToProps(state) {
  return state;
}

class CheckoutSummary extends Component {

    componentDidMount() {
        if (this.props.products.fetched === false) {
          this.props.dispatch(dispatch => {
            dispatch({ type: FETCH_PRODUCTS_START });
            api
              .GetProducts()   
              .then(products => {
                dispatch({ type: FETCH_PRODUCTS_END, payload: products });
              });
          });
        }
    
        if (this.props.cart.fetched === false) {
          this.props.dispatch(dispatch => {
            dispatch({ type: FETCH_CART_START });
    
            api
              .GetCartItems()
    
              .then(cart => {
                dispatch({ type: FETCH_CART_END, payload: cart });
              });
          });
        }
      }
      render() {
        if (
          this.props.cart.fetched === true &&
          this.props.products.fetched === true
        ) {
          var tax =
            this.props.cart.cart.meta.display_price.with_tax.amount -
            this.props.cart.cart.meta.display_price.without_tax.amount;
    
          return (
            <div className="checkout-summary">
              <div className="form-header">
                <h2>
                  Summary<span className="hide-content">
                    {' '}
                    of your order, ready for checkout.
                  </span>
                </h2>
              </div>
              <div className="checkout-items">
                <CheckoutItems />
              </div>
              <div className="price-calculations">
                <div className="price-item">
                  Subtotal<span className="hide-content"> for all products</span>
                  <span className="price">
                    {'$' +
                      this.props.cart.cart.meta.display_price.without_tax.amount /
                        100}
                  </span>
                </div>
                <div className="price-item">
                  Tax<span className="price">{'$' + tax}</span>
                </div>
                <div className="price-item">
                  Shipping<span className="price">$0</span>
                </div>
              </div>
              <div className="total-price price">
                Total{' '}
                <span className="price">
                  {'$' +
                    this.props.cart.cart.meta.display_price.without_tax.amount /
                      100}
                </span>
              </div>
            </div>
          );
        }
    
        return (
          <div className="checkout-summary">
            This is the CheckoutSummary
          </div>
        );
      }
    }
    
    export default connect(mapStateToProps)(CheckoutSummary);
