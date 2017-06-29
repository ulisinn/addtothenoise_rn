'use strict';

// React
import React from 'react';

// Navigation
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabOne } from '../navigationConfiguration';

// Redux
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    navigationState: state.tabOne
  };
};

class PortfolioTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Portfolio',
  };
  
  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigatorTabOne
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    );
  }
}

export default connect(mapStateToProps)(PortfolioTab);
