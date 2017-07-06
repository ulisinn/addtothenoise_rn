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

const scale = 0.8;

const MusicMainItem = ({ src, id, description, category, backgroundColor, onImageLoad, onNavigateToDetail, style, ...rest }) => (
  
  <View
    style={[style, styleSheet.splashView, { backgroundColor: backgroundColor, marginBottom: 20 }]}>
    
    <TouchableWithoutFeedback onPress={() => onNavigateToDetail(id)}>
      <View>
        <Text
          style={[globalStyles.COMMON_STYLES.text, {
            marginTop: 7,
            marginBottom: 25,
            color: 'white',
            paddingLeft: 10,
          }]}>{description.toUpperCase()}</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

MusicMainItem.propTypes = {
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

export default MusicMainItem;