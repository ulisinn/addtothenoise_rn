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

const scale = 0.8;

const PortfolioMainItem = ({ src, id, description, onImageLoad, onNavigateToDetail, style, ...rest }) => (
  
  <View style={[style, styleSheet.splashView]}>
    
    <TouchableWithoutFeedback onPress={() => onNavigateToDetail(id)}>
      <View style={[styleSheet.imageWrapper]}>
        <Image onLoad={() => {
          console.log('FastImage onLoad');
          // onImageLoad(id);
        }}
               source={{ uri: src, priority: FastImage.priority.normal, }}
               style={[styleSheet.image]}
               resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </TouchableWithoutFeedback>
    <Text
      style={[globalStyles.COMMON_STYLES.text, { marginTop: 10 }]}>{description.toUpperCase()} </Text>
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
    width: '100%',
  },
  image: {
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale * 9 / 16,
    height: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale * 9 / 16,
    // justifyContent: 'space-around',
    // resizeMode: 'contain',
  },
});

export default PortfolioMainItem;