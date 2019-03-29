import { createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
import reducer from './reducer';
import thunk from 'redux-thunk';
import * as api from '../moltin';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory();

const middleware = [thunk.withExtraArgument(api), routerMiddleware(history)];
const enhancers = [];

// if (process.env.NODE_ENV === 'development') {
//     const devToolsExtension = window.devToolsExtension;
  
//     if (typeof devToolsExtension === 'function') {
//       enhancers.push(devToolsExtension());
//     }
  
//     middleware.push(createLogger());
// }

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(reducer, composedEnhancers);

export default store