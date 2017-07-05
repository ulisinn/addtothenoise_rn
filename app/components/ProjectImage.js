import React from 'react';
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
import FastImage from 'react-native-fast-image';


import * as globalStyles from '../styles/global';

const ProjectImage = ({ src, id, description, onImageLoad, onNavigateToDetail, style, ...rest }) => (
  
  <Animated.View style={[style, styleSheet.splashView]}>
    <View style={[styleSheet.borderLeft]}><Text
      style={[globalStyles.COMMON_STYLES.text]}>{description} </Text></View>
    <TouchableWithoutFeedback onPress={() => onNavigateToDetail(id)}>
      <View style={[{ marginTop: 15 }]}>
        <FastImage onLoad={() => {
          console.log('FastImage onLoad');
          // onImageLoad(id);
        }}
                   source={{ uri: src, priority: FastImage.priority.normal, }}
                   style={[styleSheet.image]}
                   resizeMode={FastImage.resizeMode.contain}
        /></View>
    </TouchableWithoutFeedback>
  </Animated.View>
);

ProjectImage.propTypes = {
  src: PropTypes.string,
};

const styleSheet = StyleSheet.create({
  borderLeft: {
    borderLeftWidth: 5,
    borderColor: globalStyles.TEXT_COLOR,
    paddingLeft: 5,
  },
  splashView: {
    position: 'absolute',
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * 0.8,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  image: {
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * 0.8,
    height: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * 0.8 * 9 / 16,
    
  },
});

export default ProjectImage;