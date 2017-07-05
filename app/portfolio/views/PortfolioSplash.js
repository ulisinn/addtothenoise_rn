'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import * as _ from 'lodash';
import store from '../../store';

import { getCurrentSelection, getSplashScreenSelection } from '../../currentSelection';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';

import DescriptionText from '../../components/DescriptionText';
import ProjectImage from '../../components/ProjectImage';
import LocalNav from '../../components/LocalNav';
import Dot from '../../components/Dot';
import SplashDots from '../../components/SplashDots';


const timer = require('react-native-timer');

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
      fadeOut: true,
      currentImageIndex: 0,
      timeout: null,
    };
    
    this.opacityValue = new Animated.Value(1);
    
    this.getSplashImages = this.getSplashImages.bind(this);
    this.onNavPress = this.onNavPress.bind(this);
    this.onNavigateToDetail = this.onNavigateToDetail.bind(this);
    this.startTimeout = this.startTimeout.bind(this);
    this.sortImages = this.sortImages.bind(this);
    this.fade = this.fade.bind(this);
  }
  
  componentDidMount() {
    //
  }
  
  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }
  
  fade() {
    const { currentImageIndex, images } = this.state;
    const delay = 2000;
    this.opacityValue.setValue(0);
    // console.log('fade', currentImageIndex, delay);
    const nextIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    
    this.setState({
      currentImageIndex: nextIndex,
    });
    
    Animated.timing(
      this.opacityValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        delay: delay,
      },
    ).start(() => this.fade());
  }
  
  startTimeout() {
    // console.log(this, 'startTimeout', timer.timeoutExists(this, 'sortImages'));
    const sortImages = this.sortImages;
    const timeout = setTimeout(
      (() => {
        // console.log('timer');
        return sortImages();
      }),
      6000,
    );
    this.setState({ timeout });
  }
  
  sortImages() {
    const images = this.state.images;
    const currentImageIndex = this.state.currentImageIndex;
    images.push(images.splice(0, 1)[0]);
    // console.log(currentImageIndex, 'sortImages', images);
    this.setState({ images });
    timer.clearTimeout(this, 'sortImages');
    this.setState({ currentImageIndex: (currentImageIndex >= images.length - 1) ? 0 : currentImageIndex + 1 });
    this.startTimeout();
  }
  
  componentWillReceiveProps(newProps) {
    const numberOfImages = this.state.numberOfImages;
    if (newProps.currentSelection.length > 0 && numberOfImages !== newProps.currentSelection.length) {
      const images = newProps.currentSelection.map((d, i) => {
        
        return {
          id: d.id,
          description: d.alt,
          src: d.landingPageImage,
          loaded: false,
          index: i,
        };
      });
      this.setState({
        numberOfImages: newProps.currentSelection.length,
        images: images,
        currentImageIndex: images.length - 1,
      });
      // this.fade();
      this.startTimeout();
    }
  }
  
  render() {
    const fadeVal = this.opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const { currentSelection } = this.props;
    const { images, currentImageIndex } = this.state;
    const onImageLoad = this.onImageLoad;
    const onNavPress = this.onNavPress;
    const onNavigateToDetail = this.onNavigateToDetail;
    const imageComponent = this.getSplashImages(images, currentImageIndex, fadeVal);
    const splashDots = this.getSplashDots(images, currentImageIndex);
    // const imagesLoaded = _.every(this.state.images, ['loaded', true]);
    
    
    if (images.length > 0) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <LocalNav label={['PORTFOLIO']} onNavPress={() => onNavPress()} />
          <Animated.View style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {imageComponent}
          </Animated.View>
          <SplashDots style={{ width: 100 }} children={splashDots}>
          
          </SplashDots>
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
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
          }}>
            {imageComponent}
          </View>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    
  }
  
  getSplashImages(images, currentImageIndex, fadeVal) {
    const onNavigateToDetail = this.onNavigateToDetail;
    
    const imageComponent = images.map((item, i) => {
      // const opacity = (currentImageIndex === i) ? fadeVal : 1;
      
      return <ProjectImage
        src={item.src}
        id={item.id}
        description={item.description}
        onNavigateToDetail={(id) => onNavigateToDetail(id)}
        key={i}
      />;
    });
    return imageComponent;
  }
  
  getSplashDots(images, currentImageIndex) {
    const dots = images.map((item, i) => {
      // // console.log('getSplashDots', images, currentImageIndex);
      
      const clr = (currentImageIndex === i) ? 'rgb(191,190,178)' : 'rgba(235,235,235,1)';
      return <Dot
        key={i} style={{
        backgroundColor: clr,
      }}
      />;
    });
    return dots;
  }
  
  onNavPress() {
    // console.log('onNavPress');
    store.dispatch(actionCreators.setCurrentCategory('ALL'));
    this.props.navigation.navigate('PortfolioMain');
  }
  
  onNavigateToDetail(id) {
    // console.log('onNavigateToDetail', id);
    this.props.navigation.navigate('PortfolioDetail', { id });
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