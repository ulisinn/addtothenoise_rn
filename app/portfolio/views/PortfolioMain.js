'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';

import { getCurrentSelection, getSplashScreenSelection } from '../../currentSelection';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';

class MainScreen extends React.Component {
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
    
    const { currentSelection } = this.props;
    
    console.log('MainScreen render', currentSelection);
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text>{'Portfolio Main'}</Text>
        <FlatList
          data={currentSelection}
          renderItem={({ item }) => <Text>{item.id}: {item.title}</Text>}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PortfolioDetail')}
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: TEXT_COLOR,
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'white',
            }}
          >
            {'Portfolio Detail'}
          </Text>
        </TouchableOpacity>
      
      </View>
    );
  }
}


MainScreen.defaultProps = {
  currentSelection: [],
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

const PortfolioMain = connect(mapStateToProps, mapDispatchToProps)(MainScreen);
export default PortfolioMain;