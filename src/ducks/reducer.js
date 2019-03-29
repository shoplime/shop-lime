import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';


import user from './user';
import cart from './cart';
import products from './products';
import payments from './payments';
import checkout from './checkout';


const rootReducer = combineReducers({
    user,
    cart,
    products,
    payments,
    checkout,
    form: formReducer,
    router: routerReducer

});

export default rootReducer;