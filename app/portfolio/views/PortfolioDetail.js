'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import { getSelectionById } from '../../currentSelection';

import { View, Text, TouchableOpacity } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';

import Sound from 'react-native-sound';
import Svg, {
  Rect,
} from 'react-native-svg';

import AudioControls from '../../components/AudioControls';

class PortfolioView extends React.Component {
  
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
      isAudio: false,
      currentSound: null,
      soundIsLoaded: false,
    };
  }
  
  componentWillMount() {
    const id = (this.props.navigation.state.params.id) ? this.props.navigation.state.params.id : -1;
    const { portfolio } = this.props;
    const currentSelection = getSelectionById(id, portfolio);
    console.log('PortfolioDetail componentWillMount', currentSelection[0], currentSelection[0].mpeg);
    
    const currentSound = new Sound(currentSelection[0].mpeg, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + currentSound.getDuration() + 'number of channels: ' + currentSound.getNumberOfChannels());
    });
    
  }
  
  componentWillReceiveProps(newProps) {
    // console.log('PortfolioDetail componentWillReceiveProps', newProps);
  }
  
  componentWillUpdate(nextProps, nextState) {
    // console.log('PortfolioDetail componentWillUpdate', nextProps, nextState);
  }
  
  componentWillUnmount() {
    // console.log('PortfolioDetail componentWillUnmount');
  }
  
  render() {
    const id = (this.props.navigation.state.params.id) ? this.props.navigation.state.params.id : -1;
    const { portfolio } = this.props;
    const currentSelection = getSelectionById(id, portfolio)[0];
    const { title, controlsColor } = currentSelection;
    console.log('PortfolioDetail render', this.props);
    
    return (
      <AudioControls />
    );
  }
}


PortfolioView.defaultProps = {
  currentSelection: [],
};

const mapStateToProps = (state) => {
  console.log('PortfolioDetail mapStateToProps', state);
  
  return {
    category: state.portfolioReducer.category,
    portfolio: state.portfolioReducer.all,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PortfolioDetail = connect(mapStateToProps, mapDispatchToProps)(PortfolioView);
export default PortfolioDetail;