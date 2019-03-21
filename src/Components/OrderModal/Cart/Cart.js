import React, { useState, memo } from 'react'

const Cart = (props) => {

    return(
        <div>
            <h3>{props.cartItems}</h3>
            <button onClick={props.checkout}>Checkout</button>
        </div>
    )
}

export default memo(Cart)