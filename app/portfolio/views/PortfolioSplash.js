'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import * as _ from 'lodash';
import store from '../../store';

import { getCurrentSelection, getSplashScreenSelection } from '../../currentSelection';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';

import DescriptionText from '../../components/DescriptionText';
import ProjectImage from '../../components/ProjectImage';
import LocalNav from '../../components/LocalNav';

class SplashScreen extends React.Component {
  
  static navigationOptions = {
    title: '{addtothenoise}',
    headerBackTitle: null,
    headerTintColor: 'white',
    headerBackTitleStyle: {
      color: 'white',
      fontFamily: VEGUR_BOLD,
    },
    headerStyle: {
      backgroundColor: TEXT_COLOR,
      
    },
    headerTitleStyle: {
      color: 'white',
      fontFamily: VEGUR_BOLD,
      fontSize: 22,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      numberOfImages: 0,
      images: [],
    };
    
    this.onImageLoad = this.onImageLoad.bind(this);
    this.getSplashImages = this.getSplashImages.bind(this);
    this.onNavPress = this.onNavPress.bind(this);
  }
  
  componentWillReceiveProps(newProps) {
    const numberOfImages = this.state.numberOfImages;
    if (newProps.currentSelection.length > 0 && numberOfImages !== newProps.currentSelection.length) {
      const images = newProps.currentSelection.map((d, i) => {
        return {
          id: d.id,
          src: d.landingPageImage,
          loaded: false,
        };
      });
      this.setState({ numberOfImages: newProps.currentSelection.length, images: images });
    }
  }
  
  render() {
    const { currentSelection } = this.props;
    const { images } = this.state;
    const onImageLoad = this.onImageLoad;
    const onNavPress = this.onNavPress;
    const imageComponent = this.getSplashImages(images);
    const imagesLoaded = _.every(this.state.images, ['loaded', true]);
    
    console.log('onImageLoad render', images, imagesLoaded);
    
    if (imagesLoaded && images.length > 0) {
      return (
        
        <View style={{
          flex: 1,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <LocalNav label={['PORTFOLIO']} onNavPress={() => onNavPress()} />
          <View style={{
            // flex: 1,
            flexDirection: 'row',
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
          }}>
            {imageComponent}
          </View>
          {/*          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PortfolioMain')}
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: TEXT_COLOR,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'white',
              }}
            >{'Portfolio Main'}</Text>
          </TouchableOpacity>*/}
        </View>
      );
    } else {
      return (
        <View style={{
          flex: 1,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ActivityIndicator size='large' />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
            height: 0,
          }}>
            {imageComponent}
          </View>
        </View>
      );
    }
    
  }
  
  getSplashImages(images) {
    const onImageLoad = this.onImageLoad;
    
    const imageComponent = images.map((item, i) => (
      <ProjectImage
        src={item.src}
        id={item.id}
        onImageLoad={(id) => onImageLoad(id)}
        key={i}
      />
    ));
    
    // console.log('getSplashImages', imageComponent);
    return imageComponent;
  }
  
  onNavPress() {
    console.log('onNavPress');
    store.dispatch(actionCreators.setCurrentCategory('ALL'));
    
    this.props.navigation.navigate('PortfolioMain');
  }
  
  onImageLoad(id) {
    const { images } = this.state;
    const imageLoaded = images.map((d, i) => {
      const obj = {
          id: d.id,
          loaded: d.loaded,
          src: d.src,
        }
      ;
      if (obj.id === id) {
        obj.loaded = true;
      }
      return obj;
    });
    this.setState({ images: imageLoaded });
    // console.log(id, 'onImageLoad', this.state.images);
    
  }
}


SplashScreen.defaultProps = {
  currentSelection: [],
};

const mapStateToProps = (state) => {
  return {
    category: state.portfolioReducer.category,
    currentSelection: getSplashScreenSelection(state.portfolioReducer.category, state.portfolioReducer.all),
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PortfolioSplash = connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
export default PortfolioSplash;