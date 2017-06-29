'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';

import { getCurrentSelection, getSplashScreenSelection } from '../../currentSelection';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';

class SplashScreen extends React.Component {
  
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
    
    return (
      <View style={{
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
        <Text>{'Portfolio Splash'}</Text>
        <FlatList
          data={currentSelection}
          renderItem={({ item }) => <Text>{item.id}: {item.title}</Text>}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PortfolioMain')}
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
          >{'Portfolio Main'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


SplashScreen.defaultProps = {
  currentSelection: [],
};

const mapStateToProps = (state) => {
  return {
    category: state.portfolioReducer.category,
    currentSelection: getSplashScreenSelection(state.portfolioReducer.category, state.portfolioReducer.all),
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PortfolioSplash = connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
export default PortfolioSplash;