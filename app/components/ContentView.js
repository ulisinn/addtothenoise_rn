import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ContentView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { style } = this.props;
    
    return (
      <View style={[style, contentPanelStyle.style]}>
        <Text>Content View</Text>
      </View>
    );
  }
}


const contentPanelStyle = StyleSheet.create(
  {
    style: {
      backgroundColor: 'lightgrey',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      width: '100%',
      borderColor: 'blue'
    }
  }
);