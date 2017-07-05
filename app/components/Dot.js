import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import * as globalStyles from '../styles/global';

const Dot = ({ style, ...rest }) => (
  <View style={[style, styles.dot]}>
  </View>
);

export default Dot;


const styles = StyleSheet.create(
  {
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  },
);