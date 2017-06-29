/* @flow */

// React
import React from 'react';

// Navigation
import { addNavigationHelpers } from 'react-navigation';
import { TabBar } from '../navigationConfiguration';

//Redux
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    navigationState: state.tabBar,
  };
};

class TabBarNavigation extends React.Component {
  
  render() {
    console.log('TabBarNavigation render', this.props);
    const { dispatch, navigationState } = this.props;
    return (
      <TabBar
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    );
  }
}

export default connect(mapStateToProps)(TabBarNavigation);
