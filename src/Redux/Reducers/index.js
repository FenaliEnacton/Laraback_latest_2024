import {combineReducers} from 'redux';
import params from './params';

const rootReducer = combineReducers({
  // navigation: navigation,
  params,
  //** other package request
  //metaData : metaReducer
});

export default rootReducer;
