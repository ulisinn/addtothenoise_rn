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
    this.getDescription = this.getDescription.bind(this);
    this.getImages = this.getImages.bind(this);
  }
  
  render() {
    const { title, client } = this.props.currentSelection;
    const getDescription = this.getDescription;
    const getImages = this.getImages;
    return (
      <View style={[styleSheet.splashView, styleSheet.splashView]}>
        <Text style={[globalStyles.COMMON_STYLES.text]}>{title.toUpperCase()}
        </Text>
        <Text style={[globalStyles.COMMON_STYLES.descriptionText]}>{getDescription()}</Text>
        <View>
          {getImages()}
        </View>
      </View>
    );
  }
  
  getDescription() {
    const { title, client, role, photography } = this.props.currentSelection;
    const desc = [];
    
    if (client) {
      desc.push(client);
    }
    
    if (photography) {
      desc.push(' • ');
      desc.push(photography);
    }
    
    if (role) {
      desc.push(' • ');
      desc.push(role);
    }
    
    return desc.join('');
  }
  
  getImages() {
    const { mainImage, detailPages } = this.props.currentSelection;
    let images = [];
    images.push(mainImage);
    images = images.concat(detailPages);
    
    console.log('DetailItem', images, this.props.currentSelection);
    
    return images.map((d, i) => {
      return (<FastImage key={i}
                         resizeMode='contain'
                         onLoadStart={() => {
                           /*             console.log('Image onLoadStart', Image.getSize(src, (width, height) => {
                                          console.log('\tImage.getSize', width, height, category);
                                        }));*/
                           // onImageLoad(id);
                         }}
                         source={{ uri: d }}
                         style={[styleSheet.image]}
      />);
    });
  }
}


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