import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class BottomView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { style } = this.props;
    
    return (
      <View style={[style, bottomPanelStyle.style]}>
        <Text>Bottom View</Text>
      </View>
    );
  }
}


const bottomPanelStyle = StyleSheet.create(
  {
    style: {
      borderColor: 'red',
      bottom: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 100
    }
  }
);