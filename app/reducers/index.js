import {combineReducers} from 'redux';
import loadRemoteContent from './loadRemoteContentReducer';
import portfolioReducer from './portfolioReducer';

export const rootReducer = combineReducers({
  loadRemoteContent,
  portfolioReducer,
});
