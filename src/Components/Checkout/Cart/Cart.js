import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import CartHeader from './CartHeader';
import CartItems from './CartItems';
import CheckoutForm from '../Checkout/CheckoutForm'
import '../Checkout/Checkout.scss'

import { GetProducts } from '../../../ducks/products';
import { GetCartItems } from '../../../ducks/cart';

class Cart extends Component{
    constructor(){
        super()
        this.state = {
            reRender: false
        }
    }
    
    componentDidMount() {
        this.props.GetProducts();
        this.props.GetCartItems();
    }

    render(){
        const { cart, products } = this.props;
        const { toggleComplete, toggleCheckout, openCheckout } = this.props;

        if (
            cart.fetched === true &&
            cart.fetching === false &&
            products.fetched === true
            ){
                if (cart.cart.data[0]) {
                    var subtotal = '$' + cart.cart.meta.display_price.with_tax.amount / 100;
                    return(
                        <div className='cart'>
                            {/* <CartHeader/> */}
                            <div className='cart-header'>
                                <div id='cart-header-1'>Product</div>
                                <div id='cart-header-2'>Quantity</div>
                                <div>Price</div>
                            </div>
                            <div className='cart-items'>
                                <CartItems/>
                            </div>
                            <div className='cart-subtotal'>
                                {'Subtotal of all products '}
                                <span>{subtotal}</span>
                            </div>
                            <div className='CheckoutForm'>
                                <CheckoutForm toggleComplete={toggleComplete} toggleCheckout={toggleCheckout} openCheckout={openCheckout}/>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div>
                        {/* {this.setState({reRender: !this.state.reRender})} */}
                        <div>
                            <p>Look's like your cart is empty!</p>
                            <Link to='/'>Start Shoping</Link>
                        </div>
                    </div>
                )
                }
            } else{
                return(
                    <div>
                        <CartHeader/>
                        <p>Loading...</p>
                    </div>
                )
            }

    }
}

const mapStateToProps = ({ products, cart }) => ({
    products,
    cart
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      GetProducts,
      GetCartItems
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
