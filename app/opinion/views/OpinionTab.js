'use strict';
// React
import React from 'react';
// Navigation
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabThree } from '../navigationConfiguration';
//Redux
import { connect } from 'react-redux';
// Icon
import Icon from 'react-native-vector-icons/FontAwesome';

const mapStateToProps = (state) => {
  return {
    navigationState: state.tabThree
  };
};

class OpinionTab extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Opinion',
    labelStyle: {
      fontSize: 24,
    },
    // tabBarIcon: ({ tintColor }) => <Icon size={20} name={'umbrella'} color={tintColor} />
  };
  
  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <NavigatorTabThree
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navigationState
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(OpinionTab);
