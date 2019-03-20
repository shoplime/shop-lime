import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home'
import Admin from './Components/Admin/Admin'
import OpenTok from './Components/OpenTok/OpenTok'
import OTClient from './Components/OTClient/OTClient'


export default (
    <Switch>
        <Route exact path= '/' component={Home} />
        <Route path= '/admin' component={Admin} />
        <Route path= '/opentok' component={OpenTok} />
        <Route path= '/otclient' component={OTClient} />
    </Switch>
)