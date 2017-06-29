'use strict';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';


export default class PortfolioSplash extends React.Component {
  
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
    return (
      <View style={{
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
        <Text>{'Portfolio Splash'}</Text>
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
