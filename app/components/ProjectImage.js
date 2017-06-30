import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';

import * as globalStyles from '../styles/global';

const ProjectImage = ({ src, style, ...rest }) => (
  <View style={[style]}>
    <Text>{src} </Text>
    <Image source={{uri: src}} style={{width: 200, height: 200}} />
  </View>
);

ProjectImage.propTypes = {
  src: PropTypes.string,
};

export default ProjectImage;