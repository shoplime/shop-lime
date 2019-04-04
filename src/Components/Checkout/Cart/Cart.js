import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import CartItems from './CartItems';
import CheckoutForm from '../Checkout/CheckoutForm'
import '../Checkout/Checkout.scss'

import { GetProducts } from '../../../ducks/products';
import { GetCartItems } from '../../../ducks/cart';

class Cart extends Component{
    constructor(){
        super()
        this.state = {
            reRender: false,
            toggleCheckout: false
        }
    }
    
    componentDidMount() {
        this.props.GetProducts();
        this.props.GetCartItems();
    }
    toggleCheckout = () => {
        this.setState({
            toggleCheckout: !this.state.toggleCheckout
        })
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
                            
                            {this.state.toggleCheckout? <div className='CheckoutForm'>
                                <CheckoutForm toggleComplete={toggleComplete} toggleCheckout={toggleCheckout} openCheckout={openCheckout}/>
                            </div>: <div>
                                <div className='cart-header'>
                                    <div id='cart-header-1'>Product</div>
                                    <div id='cart-header-2'>Quantity</div>
                                    <div>Price</div>
                                </div>
                                <div className='cart-items'>
                                    <CartItems/>
                                </div>
                                <div className='cart-subtotal'>
                                    {'Subtotal of all products: '}
                                    <strong>{subtotal}</strong>
                                </div>
                                <div className='cart-checkout-button'>
                                <div onClick={()=>{toggleCheckout(!openCheckout)}} className='cart-return'>RETURN</div>
                                <button onClick={this.toggleCheckout} className='checkout-button'>CHECKOUT</button>
                                </div>
                            </div>
                            }
                            
                        </div>
                    )
                }
                else{
                    return(
                    <div>
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
