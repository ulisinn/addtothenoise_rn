import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import { Dimensions as RNDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';


import * as globalStyles from '../styles/global';

const ProjectImage = ({ src, id, onImageLoad, style, ...rest }) => (
  
  <View>
    <Text>{id} </Text>
    <FastImage onLoad={() => onImageLoad(id)}
               source={{ uri: src, priority: FastImage.priority.normal, }}
               style={{ width: 300, height: 200 }}
               resizeMode={FastImage.resizeMode.contain}
    />
  </View>
);

ProjectImage.propTypes = {
  src: PropTypes.string,
};

export default ProjectImage;