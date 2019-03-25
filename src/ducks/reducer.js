import { combineReducers } from 'redux';

import user from './user';
import cart from './cart';
import products from './products';
import payments from './payments';


const rootReducer = combineReducers({
    user,
    cart,
    products,
    payments
});

export default rootReducer;