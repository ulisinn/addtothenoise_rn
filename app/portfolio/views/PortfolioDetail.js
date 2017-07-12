'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import moment from 'moment';
import { getSelectionById } from '../../currentSelection';

import { View, Text, TouchableOpacity } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';

import Sound from 'react-native-sound';
import Svg, {
  Rect,
} from 'react-native-svg';

import AudioControls from '../../components/AudioControls';
import DetailItem from '../../components/DetailItem';

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
      totalDuration: 0,
    };
    this.onAudio = this.onAudio.bind(this);
  }
  
  componentWillMount() {
    const id = (this.props.navigation.state.params.id) ? this.props.navigation.state.params.id : -1;
    const { portfolio } = this.props;
    const currentSelection = getSelectionById(id, portfolio);
    const onAudio = this.onAudio;
    console.log('PortfolioDetail componentWillMount', currentSelection[0], currentSelection[0].mpeg);
    
    if (currentSelection[0].mpeg) {
      const currentSound = new Sound(currentSelection[0].mpeg, '', (error) => {
        if (error) {
          onAudio(error);
          return;
        }
        // loaded successfully
        onAudio(null, currentSound, currentSound.getDuration());
        
      });
    }
  }
  
  
  render() {
    const { totalDuration, currentSound } = this.state;
    const { portfolio } = this.props;
    const id = (this.props.navigation.state.params.id) ? this.props.navigation.state.params.id : -1;
    const currentSelection = getSelectionById(id, portfolio)[0];
    console.log('PortfolioDetail render', this.props, currentSelection);
    const { title, controlsColor, backgroundColor } = currentSelection;
    if (currentSelection) {
    } else {
      return null;
    }
    if (currentSelection.mpeg) {
      return (
        <AudioControls
          backgroundColor={backgroundColor}
          controlsColor={controlsColor}
          totalDuration={totalDuration}
          title={title}
          currentSound={currentSound} />
      );
    } else {
      return (
        <DetailItem
          title={title}
        />
      );
    }
  }
  
  onAudio(err, currentSound, duration) {
    if (err) {
      console.log('failed to load the sound', err);
      return;
    }
    console.log('duration in seconds: ' + currentSound.getDuration() + 'number of channels: ' + currentSound.getNumberOfChannels());
    this.setState({
      currentSound: currentSound,
      totalDuration: currentSound.getDuration(),
    });
    
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