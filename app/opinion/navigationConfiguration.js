'use strict';
import { StackNavigator } from 'react-navigation';

// Screens
import OpinionView from './views/OpinionView';

const routeConfiguration = {
  OpinionView: { screen: OpinionView },
  
};
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'float',
  initialRouteName: 'OpinionView',
  cardStyle: { backgroundColor: 'white' },
};

export const NavigatorTabThree = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
