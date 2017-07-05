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
import ProjectImage from '../../components/SplashImage';
import LocalNav from '../../components/LocalNav';
import Dot from '../../components/Dot';
import SplashDots from '../../components/SplashDots';


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
    const sortImages = this.sortImages;
    
    this.opacityValue.setValue(1);
    
    Animated.timing(
      this.opacityValue,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ).start(() => {
      return sortImages();
    });
  }
  
  startTimeout() {
    const fade = this.fade;
    const timeout = setTimeout(
      (() => {
        return fade(); //sortImages();
      }),
      4000,
    );
    this.setState({ timeout });
  }
  
  sortImages() {
    this.opacityValue.setValue(1);
    const images = this.state.images;
    const popped = images.pop();
    images.splice(0, 0, popped);
    this.setState({ images });
    this.setState({ currentImageIndex: (popped.index - 1 < 0) ? images.length - 1 : popped.index - 1 });
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
    const onNavPress = this.onNavPress;
    const onNavigateToDetail = this.onNavigateToDetail;
    const imageComponent = this.getSplashImages(images, currentImageIndex, fadeVal);
    const splashDots = this.getSplashDots(images, currentImageIndex);
    
    
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {imageComponent}
          </Animated.View>
          <SplashDots style={{ width: 100 }} children={splashDots} />
        </View>
      );
    } else {
      return (
        <View style={{
          flex: 1,
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
      const opacity = (i === images.length - 1) ? fadeVal : 1;
      return <ProjectImage
        src={item.src}
        id={item.id}
        description={item.description}
        onNavigateToDetail={(id) => onNavigateToDetail(id)}
        key={i}
        style={{ opacity }}
      />;
    });
    return imageComponent;
  }
  
  getSplashDots(images, currentImageIndex) {
    const dots = images.map((item, i) => {
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