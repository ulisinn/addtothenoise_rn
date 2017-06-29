'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import * as _ from 'lodash';

import { View, Text, TouchableOpacity } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';

class AboutView extends React.Component {
  
  static navigationOptions = {
    title: '{addtothenoise}',
    headerBackTitle: null,
    headerBackTitleStyle: {
      color: 'white',
      fontFamily: VEGUR_BOLD,
    },
    headerStyle: {
      backgroundColor: TEXT_COLOR,
      
    },
    headerTitleStyle: {
      color: 'white',
      fontFamily: VEGUR_BOLD,
      fontSize: 22,
    },
  };
  
  render() {
    const { currentSelection } = this.props;
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
        <Text>{(currentSelection.length > 0) ? this.props.currentSelection[0].body : ''}</Text>
      </View>
    );
  }
}

AboutView.defaultProps = {
  currentSelection: [],
};

const getCurrentSelection = (category, all) => {
  const res = all.filter((o) => {
    return (o.category === category) ? true : false;
  });
  
  return res;
};
const mapStateToProps = (state) => {
  return {
    category: state.portfolioReducer.category,
    currentSelection: getCurrentSelection(state.portfolioReducer.category, state.portfolioReducer.all),
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const TabTwoScreenOne = connect(mapStateToProps, mapDispatchToProps)(AboutView);
export default TabTwoScreenOne;