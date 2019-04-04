import React, { useState, Suspense, useEffect, memo } from 'react'
import Cart from './../Checkout/Cart/Cart'
import './MobileCheckout.scss'
import Close from '@material-ui/icons/Close'


const MobileCheckout = (props) => {

    return(
        <div className='checkout-modal-wrapper'>
            <Close onClick={() => {props.closeModal(false)}} />
            <Cart />
        </div>
    )
}

export default MobileCheckout