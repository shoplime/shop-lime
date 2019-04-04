import React, { useState, Suspense, useEffect, memo } from 'react'
import Cart from './../Checkout/Cart/Cart'
import './MobileCheckout.scss'

const MobileCheckout = () => {

    return(
        <div className='checkout-modal-wrapper'>
            <Cart />
        </div>
    )
}

export default MobileCheckout