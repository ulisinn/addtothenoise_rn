import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TopView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { style } = this.props;
    return (
      <View style={[style, topPanelStyle.style]}>
        <Text>Top View</Text>
      </View>
    );
  }
}

const topPanelStyle = StyleSheet.create(
  {
    style: {
      borderColor: 'red',
      marginTop: 20,
      position: 'absolute',
      width: '100%',
      zIndex: 100
    }
  }
);