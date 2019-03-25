import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home'
import Admin from './Components/Admin/Admin'
import OpenTok from './Components/OpenTok/OpenTok'
import OTClient from './Components/OTClient/OTClient'
import OTHLS from './Components/OTHLS/OTHLS'
import Cart from './Components/Checkout/Cart/Cart'
import CheckoutContainer from './Components/Checkout/Checkout/CheckoutContainer'
import OrderConfirmation from './Components/Checkout/Orders/OrderConfirmationContainer';


export default (
    <Switch>
        <Route exact path= '/' component={Home} />
        <Route path= '/admin' component={Admin} />
        <Route path= '/opentok' component={OpenTok} />
        <Route path= '/otclient' component={OTClient} />
        <Route path= '/othls' component={OTHLS} />
        <Route path= '/cart' component={Cart} />
        <Route path= '/checkout' component={CheckoutContainer} />
        <Route path= '/order-confirmation' component={OrderConfirmation} />
    </Switch>
)