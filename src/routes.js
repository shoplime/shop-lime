import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home'
import Admin from './Components/Admin/Admin'
import CartPage from './Components/Checkout/Cart/CartPage'
import CheckoutContainer from './Components/Checkout/Checkout/CheckoutContainer'
import MobileHome from './Components/MobileHome/MobileHome'
import Login from './Components/Login/Login'
import ProductPage from './Components/ProductPage/ProductPage'

export default ( 
    <Switch>
        <Route exact path= '/' component={Home} />
        <Route path= '/admin' component={Admin} />
        <Route path= '/cart' component={CartPage} />
        <Route path= '/checkout' component={CheckoutContainer} />
        <Route path= '/mobilehome' component={MobileHome} />  
        <Route path= '/login' component={Login} />
        <Route path= '/:productid?/:streamid?' component={ProductPage} />
    </Switch>
)