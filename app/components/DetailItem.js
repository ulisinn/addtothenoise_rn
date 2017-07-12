import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Dimensions as RNDimensions } from 'react-native';

import * as globalStyles from '../styles/global';
import FastImage from 'react-native-fast-image';

const scale = 0.8;

export default class DetailItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { title } = this.props;
    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
  }
}