import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import CartCounter from './CartCounter';

const CartHeader = props => {
    let headerText;

    if (props.location.pathname.includes('cart')) {
      headerText = 'Shopping Cart';
    } else if (props.location.pathname.includes('checkout')) {
      headerText = 'Checkout';
    } else if (props.location.pathname.includes('order-confirmation')) {
      headerText = 'Order Confirmation';
    }
    return(
        <header>
            <div>
                <nav>
                    <Link to='/'>ShopLime</Link>
                </nav>
                <div>
                    <Link to='/cart'><CartCounter/></Link>
                </div>
            </div>
            <h1>{headerText}</h1>
        </header>
    )
}

export default withRouter(CartHeader)