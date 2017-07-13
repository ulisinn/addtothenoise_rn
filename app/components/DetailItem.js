import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Dimensions as RNDimensions } from 'react-native';

import * as globalStyles from '../styles/global';
import FastImage from 'react-native-fast-image';

const scale = 0.8;

export default class DetailItem extends Component {
  
  _keyExtractor = (item, index) => item;
  
  constructor(props) {
    super(props);
    this.getDescription = this.getDescription.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getListItem = this.getListItem.bind(this);
  }
  
  render() {
    const { title, client } = this.props.currentSelection;
    const getDescription = this.getDescription;
    const getImages = this.getImages;
    const getListItem = this.getListItem;
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={[globalStyles.COMMON_STYLES.text, {
          padding: 20,
          paddingBottom: 5,
        }]}>{title.toUpperCase()}
        </Text>
        <Text style={[globalStyles.COMMON_STYLES.descriptionText, {
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 0,
        }]}>{getDescription()}</Text>
        <FlatList style={{ marginTop: 40 }}
                  data={getImages()}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => {
                    return getListItem(item);
                  }}
        />
        {/*        <View>
          {getImages()}
        </View>*/}
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
    if (detailPages && detailPages.length >= 1) {
      images = images.concat(detailPages);
    }
    
    console.log('DetailItem', images, this.props.currentSelection);
    
    return images;
  }
  
  getListItem(item) {
    const onNavigateToDetail = this.onNavigateToDetail;
    const { category } = this.props;
    // console.log(category, 'getListItem', item.backgroundColor);
    
    return <FastImage resizeMode='contain'
                      onLoadStart={() => {
                        /*             console.log('Image onLoadStart', Image.getSize(src, (width, height) => {
                                       console.log('\tImage.getSize', width, height, category);
                                     }));*/
                        // onImageLoad(id);
                      }}
                      source={{ uri: item }}
                      style={[styleSheet.image]}
    />;
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