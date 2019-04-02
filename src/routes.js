import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home'
import Admin from './Components/Admin/Admin'
import CartPage from './Components/Checkout/Cart/CartPage'
import CheckoutContainer from './Components/Checkout/Checkout/CheckoutContainer'
import ProductsContainer from './Components/Products/ProductsContainer'

export default (
    <Switch>
        <Route exact path= '/' component={Home} />
        <Route path= '/admin' component={Admin} />
        <Route path= '/cart' component={CartPage} />
        <Route path= '/checkout' component={CheckoutContainer} />
        <Route path= '/products' component={ProductsContainer} />

    </Switch>
)