import React, { useState, memo } from 'react'
import Checkout from '../Checkout/Checkout';
import Cart from './Cart/Cart';
import {Elements, StripeProvider} from 'react-stripe-elements';

const OrderModal = (props) => {
    const [modalView, setView] = useState(false)

    const [cartItems, addToCart] = useState(['Apple', 'Knife', 'Plate'])

    const toggleView = () => {
        setView(modalView === false? true : false)
    }

    const products = (product) => {
        addToCart(cartItems += product)
    }
    
    return(
        <div>
            {/* {modalView?<button id="customButton">Purchase</button>:<Cart checkout={toggleView} cartItems={cartItems}/>} */}
        
            {modalView?<div>
                {/* <StripeProvider apiKey="pk_test_0f3rTmUKB6IRavcAXMcwEQSR">
                    <div className="example">
                    <Elements>
                        <Checkout />
                    </Elements>
                    </div>
                </StripeProvider> */}
                </div>:<Cart checkout={toggleView} cartItems={cartItems}/>}
        </div>
    )
}

export default memo(OrderModal)




      
