import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home'
import Admin from './Components/Admin/Admin'
import Cart from './Components/Checkout/Cart/Cart'
import CheckoutContainer from './Components/Checkout/Checkout/CheckoutContainer'
import ProductsContainer from './Components/Products/ProductsContainer'
import MobileHome from './Components/MobileHome/MobileHome'
import Login from './Components/Login/Login'

export default (
    <Switch>
        <Route exact path= '/' component={Home} />
        <Route path= '/admin' component={Admin} />
        <Route path= '/cart' component={Cart} />
        <Route path= '/checkout' component={CheckoutContainer} />
        <Route path= '/products' component={ProductsContainer} />
        <Route path= '/mobilehome' component={MobileHome} />
        <Route path= '/login' component={Login} />
    </Switch>
)