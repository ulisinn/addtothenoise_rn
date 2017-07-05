import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';

import * as globalStyles from '../styles/global';

const SplashDots = ({ style, children, ...rest }) => (
    <View style={[style, styles.container]}>
      {children}
    </View>
  )
;

export default SplashDots;


const styles = StyleSheet.create(
  {
    container: {
      // flex: 1,
      alignContent: 'center',
      flexDirection: 'row-reverse',
      height: 20,
      justifyContent: 'space-between',
    },
  },
);