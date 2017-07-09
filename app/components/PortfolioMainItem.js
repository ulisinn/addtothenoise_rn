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

import * as globalStyles from '../styles/global';
import FastImage from 'react-native-fast-image';

const scale = 0.8;

const PortfolioMainItem = ({ src, id, description, category, onImageLoad, onNavigateToDetail, style, ...rest }) => (
  
  <View style={[style, styleSheet.splashView]}>
    
    <TouchableWithoutFeedback onPress={() => onNavigateToDetail(id)}>
      <View style={[styleSheet.imageWrapper]}>
        <FastImage resizeMode='cover'
                   onLoadStart={() => {
        /*             console.log('Image onLoadStart', Image.getSize(src, (width, height) => {
                       console.log('\tImage.getSize', width, height, category);
                     }));*/
                     // onImageLoad(id);
                   }}
                   source={{ uri: src }}
                   style={[styleSheet.image]}
        />
      </View>
    </TouchableWithoutFeedback>
    <Text
      style={[globalStyles.COMMON_STYLES.text, {
        marginTop: 10,
        marginBottom: 25,
      }]}>{description.toUpperCase()} </Text>
  </View>
);

PortfolioMainItem.propTypes = {
  src: PropTypes.string,
};

const styleSheet = StyleSheet.create({
  splashView: {
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale,
    padding: 1,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    // borderWidth: StyleSheet.hairlineWidth,
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale,
    height: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale * 9 / 16,
  },
  image: {
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale,
    height: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale * 9 / 16,
    // justifyContent: 'space-around',
  },
});

export default PortfolioMainItem;