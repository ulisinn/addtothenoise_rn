'use strict';
import { TabNavigator } from 'react-navigation';

import { TEXT_COLOR, HEADER_TEXT_COLOR, VEGUR_BOLD } from '../styles/global';
// Tab-Navigators
import PortfolioTab from '../portfolio/views/PortfolioTab';
import AboutTab from '../about/views/AboutTab';
import OpinionTab from '../opinion/views/OpinionTab';


const routeConfiguration = {
  portfolio: { screen: PortfolioTab },
  about: { screen: AboutTab },
  opinion: { screen: OpinionTab },
};

const tabBarConfiguration = {
  tabBarOptions: {
    activeTintColor: HEADER_TEXT_COLOR,
    inactiveTintColor: TEXT_COLOR,
    labelStyle: {
      fontSize: 14,
      fontFamily: VEGUR_BOLD,
    },
    showIcon: false,
    activeBackgroundColor: TEXT_COLOR,
    inactiveBackgroundColor: HEADER_TEXT_COLOR,
    
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  backBehavior: 'none',
};

export const TabBar = TabNavigator(routeConfiguration, tabBarConfiguration);

export const tabBarReducer = (state, action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index: 0 };
  } else {
    return TabBar.router.getStateForAction(action, state);
  }
};
