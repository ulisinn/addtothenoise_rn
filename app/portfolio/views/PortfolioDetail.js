'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import { getSelectionById } from '../../currentSelection';

import { View, Text, TouchableOpacity } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';


class PortfolioView extends React.Component {
  
  static navigationOptions = {
    title: '{addtothenoise}',
    headerBackTitle: null,
    headerTintColor: 'white',
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
    const id = (this.props.navigation.state.params.id) ? this.props.navigation.state.params.id : -1;
    const { portfolio } = this.props;
    const currentSelection = getSelectionById(id, portfolio);
    // console.log('PortfolioDetail render', id, currentSelection, portfolio);
    
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
        <Text>{currentSelection[0].title}</Text>
      </View>
    );
  }
}


PortfolioView.defaultProps = {
  currentSelection: [],
};

const mapStateToProps = (state) => {
  return {
    category: state.portfolioReducer.category,
    portfolio: state.portfolioReducer.all,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PortfolioDetail = connect(mapStateToProps, mapDispatchToProps)(PortfolioView);
export default PortfolioDetail;