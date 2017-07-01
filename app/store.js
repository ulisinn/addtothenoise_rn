'use strict';

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Navigation
import { NavigatorTabOne } from './portfolio/navigationConfiguration';
import { NavigatorTabTwo } from './about/navigationConfiguration';
import { NavigatorTabThree } from './opinion/navigationConfiguration';
import { TabBar, tabBarReducer } from './tabBar/navigationConfiguration';
import loadRemoteContent from './reducers/loadRemoteContentReducer';
import portfolioReducer from './reducers/portfolioReducer';
import { getRemoteData } from './actions/index';

export const REMOTE_LOAD_PENDING = 'REMOTE_LOAD_PENDING';
export const REMOTE_LOAD_SUCCESS = 'REMOTE_LOAD_SUCCESS';
export const REMOTE_LOAD_ERROR = 'REMOTE_LOAD_ERROR';
export const REMOTE_DATA_READY = 'REMOTE_DATA_READY';

export const INIT_PORTFOLIO = 'INIT_PORTFOLIO';

export const SPLASH: string = 'splash';
export const SET_CURRENT_CATEGORY: string = 'SET_CURRENT_CATEGORY';
export const PRINT: string = 'print';
export const WEB: string = 'web';
export const OTHER: string = 'other';
export const AUDIO: string = 'other';
export const OPINION: string = 'other';
export const ABOUT: string = 'about';

export const baseUrl = 'http://addtothenoise.com';
const url = `${baseUrl}/api/all.php`;

// Middleware
const middleware = () => {
  return applyMiddleware(logger, thunk);
};

const reducer = combineReducers(
  {
    loadRemoteContent: loadRemoteContent,
    portfolioReducer: portfolioReducer,
    tabBar: tabBarReducer,
    tabOne: (state, action) => NavigatorTabOne.router.getStateForAction(action, state),
    tabTwo: (state, action) => NavigatorTabTwo.router.getStateForAction(action, state),
    tabThree: (state, action) => NavigatorTabThree.router.getStateForAction(action, state),
  },
);

const store = createStore(
  reducer,
  middleware(),
);

store.dispatch(getRemoteData(url));

export default store;
