'use strict';

import { StackNavigator } from 'react-navigation';

// Screens
import AboutView from './views/AboutView';

const routeConfiguration = {
  AboutView: { screen: AboutView },
};
// going to disable the header for now

const stackNavigatorConfiguration = {
  headerMode: 'float',
  initialRouteName: 'AboutView',
  cardStyle: { backgroundColor: 'white' },
};

export const NavigatorTabTwo = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
