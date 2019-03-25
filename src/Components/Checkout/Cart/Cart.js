import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import CartHeader from './CartHeader';
import CartItems from './CartItems';

import { GetProducts } from '../../../ducks/products';
import { GetCartItems } from '../../../ducks/cart';

class Cart extends Component{
    
    componentDidMount() {
        this.props.GetProducts();
        this.props.GetCartItems();
    }

    render(){
        const { cart, products } = this.props;
        if (
            cart.fetched === true &&
            cart.fetching === false &&
            products.fetched === true
            ){
                if (cart.cart.data[0]) {
                    var subtotal = '$' + cart.cart.meta.display_price.with_tax.amount / 100;
                    return(
                        <div>
                            <CartHeader/>
                            <div>
                                <div>Product</div>
                                <div>Quantity</div>
                                <div>Price</div>
                            </div>
                            <CartItems/>
                            <div>
                                {'Subtotal of all products '}
                                <span>{subtotal}</span>
                            </div>
                            <Link to='/checkout'>Checkout</Link>
                        </div>
                    )
                }
                else{
                return(
                    <div>
                        <CartHeader/>
                        <div>
                            <p>Look's like your cart is empty!</p>
                            <Link to='/'>Start Shoping</Link>
                        </div>
                    </div>)
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
