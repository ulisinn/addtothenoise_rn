import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import * as globalStyles from '../styles/global';

const DescriptionText = ({ children, textPaddingLeft, style, ...rest }) => (
  <View style={[style]}>
    <Text style={[globalStyles.COMMON_STYLES.text, { paddingLeft: textPaddingLeft }]}>
      {children}
    </Text>
  </View>
);

DescriptionText.propTypes = {
  children: PropTypes.node,
  textPaddingLeft: PropTypes.number,
};

export default DescriptionText;
