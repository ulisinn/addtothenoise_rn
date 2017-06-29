'use strict';

import { StackNavigator } from 'react-navigation';

// Screens
import PortfolioSplash from './views/PortfolioSplash';
import PortfolioMain from './views/PortfolioMain';
import PortfolioDetail from './views/PortfolioDetail';

const routeConfiguration = {
  PortfolioSplash: {
    screen: PortfolioSplash,
  },
  PortfolioMain: { screen: PortfolioMain },
  PortfolioDetail: { screen: PortfolioDetail },
};

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'float',
  initialRouteName: 'PortfolioSplash',
  cardStyle: { backgroundColor: 'white' },
};

export const NavigatorTabOne = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
