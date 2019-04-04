import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import CartItems from './CartItems';
import CartPageCheckout from '../Checkout/CartPageCheckout'
import '../Checkout/Checkout.scss'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../../mui_theme';

import { GetProducts } from '../../../ducks/products';
import { GetCartItems } from '../../../ducks/cart';


class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            toggleCheckout: false,
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
                            <MuiThemeProvider theme={theme}>
                                <AppBar color="secondary">
                                    <Toolbar style={{justifyContent:'space-between', padding: '0px 20%'}}>
                                        {/* <MenuIcon></MenuIcon> */}
                                        <Typography variant="h5" id='shopLime'>
                                            <Link to='/'>SHOPLIME</Link>
                                        </Typography>
                                        <Typography variant="h3" style={{fontSize: '18px', marginLeft: '600px', textDecoration: 'none'}} id='viewLive'>
                                            <Link to='/'>LIVE</Link>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </MuiThemeProvider>
                            {this.state.toggleCheckout? 
                                <div className='CheckoutForm-2'>
                                    <CartPageCheckout toggleComplete={toggleComplete} toggleCheckout={toggleCheckout} openCheckout={openCheckout} />
                                </div>:
                                <div>
                                    <div className='cart-header-2'>
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
                                    <button onClick={this.toggleCheckout} className='cart-button'>Checkout</button>
                                </div>
                            }
                        </div>
                    )
                }
                else{
                return(
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <AppBar color="secondary">
                                <Toolbar style={{justifyContent:'space-between', padding: '0px 20%'}}>
                                    <Typography variant="h5">
                                        SHOPLIME
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </MuiThemeProvider>                        
                        <div>
                            <p>Look's like your cart is empty!</p>
                            <Link to='/'>Start Shoping</Link>
                        </div>
                    </div>)
                }
            } else{
                return(
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <AppBar color="secondary">
                                <Toolbar style={{justifyContent:'space-between', padding: '0px 20%'}}>
                                    <Typography variant="h5">
                                        SHOPLIME
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </MuiThemeProvider>
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
