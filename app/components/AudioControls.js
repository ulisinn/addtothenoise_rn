import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';

import Svg, {
  Rect,
  G,
  Path,
  Polygon,
} from 'react-native-svg';

import { Text as SvgText } from 'react-native-svg';
import moment from 'moment';
import * as globalStyles from '../styles/global';


import Slider from 'react-native-slider';

export default class AudioControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.8,
      isPaused: true,
      isMuted: false,
      currentTime: 0,
      heartbeat: null,
    };
    
    this.togglePlayState = this.togglePlayState.bind(this);
    this.toggleMuteState = this.toggleMuteState.bind(this);
    this.getPlayButton = this.getPlayButton.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }
  
  componentWillMount() {
    console.log('AudioControls componentWillMount', this.props.currentSound);
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.currentSound && this.state.heartbeat === null) {
      this.startTimer();
    }
    console.log('AudioControls componentWillReceiveProps', newProps.currentSound);
  }
  
  componentWillUpdate(nextProps, nextState) {
    console.log('AudioControls componentWillUpdate', nextProps, nextState);
  }
  
  componentWillUnmount() {
    const { currentSound } = this.props;
    const { heartbeat } = this.state;
    
    if (currentSound) {
      currentSound.stop();
      currentSound.release();
    }
    clearInterval(heartbeat);
    console.log('AudioControls componentWillUnmount', currentSound);
  }
  
  render() {
    const { currentTime, isMuted } = this.state;
    const { controlsColor, backgroundColor, title, totalDuration, currentSound } = this.props;
    const togglePlayState = this.togglePlayState;
    
    const totalTime = moment.duration(totalDuration, 'seconds');
    const parsedTotalMinutes = (parseInt(totalTime.minutes()) < 10) ? '0' + totalTime.minutes() : totalTime.minutes();
    const parsedTotalSeconds = (parseInt(totalTime.seconds()) < 10) ? '0' + totalTime.seconds() : totalTime.seconds();
    
    const currentElapsedTime = moment.duration(currentTime, 'seconds');
    const parsedCurrentMinutes = (parseInt(currentElapsedTime.minutes()) < 10) ? '0' + currentElapsedTime.minutes() : currentElapsedTime.minutes();
    const parsedCurrentSeconds = (parseInt(currentElapsedTime.seconds()) < 10) ? '0' + currentElapsedTime.seconds() : currentElapsedTime.seconds();
    
    if (!currentSound) {
      return (
        <View style={[styles.container]}>
          <View style={[styles.controls, {
            borderColor: controlsColor,
            backgroundColor: backgroundColor,
            width: 300,
            height: 134,
          }]}>
            <Text style={[globalStyles.COMMON_STYLES.text, {
              color: 'white',
              margin: 8,
              position: 'absolute',
              top: 0,
            }]}>{title}</Text>
            <ActivityIndicator size='large' color={controlsColor} />
          </View>
        </View>
      );
    }
    
    return (
      <View style={[styles.container]}>
        <View style={[styles.controls, {
          borderColor: controlsColor,
          backgroundColor: backgroundColor,
        }]}>
          <Text style={[globalStyles.COMMON_STYLES.text, {
            color: 'white',
            marginBottom: 8,
          }]}>{title}</Text>
          
          <Svg style={[styles.border]}
               width="280"
               height="50">
            {this.getPlayButton()}
            
            <G id='durationText'>
              <SvgText
                fill={controlsColor}
                fontSize="17"
                x="48%"
                y="13.5"
                textAnchor="middle"
              >{`${parsedCurrentMinutes}:${parsedCurrentSeconds}`}
                / {`${parsedTotalMinutes}:${parsedTotalSeconds}`}</SvgText>
            </G>
            {this.getSpeakerButton()}
          
          </Svg>
          <Slider style={[styles.border]}
                  width={200}
                  thumbTintColor={controlsColor}
                  minimumTrackTintColor={controlsColor}
                  maximumTrackTintColor={`${controlsColor}33`}
                  minimumValue={0}
                  maximumValue={1}
                  value={(isMuted) ? 0 : this.state.value}
                  onValueChange={(value) => this.setVolume(value)} />
        
        </View>
      </View>
    );
  }
  
  getPlayButton() {
    const { isPaused } = this.state;
    const { currentSound } = this.props;
    const togglePlayState = this.togglePlayState;
    
    if (!currentSound) {
      return null;
    }
    
    if (isPaused) {
      return (
        <G id='PlayBtn' y='1'
           onPress={() => togglePlayState()}>
          <Rect fill='rgba(255,255,255,0.001)'
                x='7.25'
                y='5.25'
                width='37'
                height='37'
                stroke={this.props.controlsColor}
                strokeWidth={StyleSheet.hairlineWidth}
          />
          <Polygon points='18.5 34.5 36.5 23.5 18.5 12.5 18.5 34.5'
                   fill={this.props.controlsColor} />
        </G>
      
      );
    } else {
      return (
        <G id='PauseBtn' y='1' x='0'
           onPress={() => togglePlayState()}
        >
          <Rect fill='rgba(255,255,255,0.001)'
                x='7.25'
                y='5.25'
                width='37'
                height='37'
                stroke={this.props.controlsColor}
                strokeWidth={StyleSheet.hairlineWidth} />
          
          <Rect x='18' y='13' width='6' height='22' fill={this.props.controlsColor} />
          <Rect x='27' y='13' width='6' height='22' fill={this.props.controlsColor} />
        </G>
      );
    }
  }
  
  getSpeakerButton() {
    const { isMuted } = this.state;
    const { currentSound } = this.props;
    const toggleMuteState = this.toggleMuteState;
    
    if (!currentSound) {
      return null;
    }
    if (isMuted) {
      return (
        <G id='mutedSpeaker'
           x='-45'
           onPress={() => toggleMuteState()}
        >
          <Rect fill='rgba(255,255,255,0.001)'
                x='265'
                y='6'
                width='56'
                height='37'
                stroke={this.props.controlsColor}
                strokeWidth={StyleSheet.hairlineWidth} />
          
          <Polygon fill={this.props.controlsColor}
                   points='294.64 10.71 285.06 19 276 19 276 29.66 284.93 29.66 294.64 38.06 294.64 10.71' />
          <Path
            d='M311.4,31.09,299.82,17.53'
            fill="none"
            stroke={this.props.controlsColor}
          />
          <Path
            d='M299.82,31.09,311.4,17.53'
            fill="none"
            stroke={this.props.controlsColor}
          />
        </G>
      
      );
    } else {
      return (
        <G id='unMutedSpeaker'
           x='-45'
           onPress={() => toggleMuteState()}
        >
          <Rect fill='rgba(255,255,255,0.001)'
                x='265'
                y='6'
                width='56'
                height='37'
                stroke={this.props.controlsColor}
                strokeWidth={StyleSheet.hairlineWidth} />
          
          <Polygon fill={this.props.controlsColor}
                   points='294.64 10.71 285.06 19 276 19 276 29.66 284.93 29.66 294.64 38.06 294.64 10.71' />
          <G id='Unmute'>
            <Path id='path1'
                  d='M299.73,29.88a11.21,11.21,0,0,0,0-12'
                  strokeLinecap='round'
                  fill='none'
                  stroke={this.props.controlsColor}
                  strokeWidth='2' />
            <Path id='path2'
                  d='M303.61,14a16.73,16.73,0,0,1,.05,19.84'
                  strokeLinecap='round'
                  fill='none'
                  stroke={this.props.controlsColor}
                  strokeWidth='2' />
            <Path id='path1-2'
                  data-name='path1'
                  d='M307.32,37.46a21.83,21.83,0,0,0-.06-27.14'
                  strokeLinecap='round'
                  fill='none'
                  stroke={this.props.controlsColor}
                  strokeWidth='2' />
          </G>
        </G>
      );
    }
  }
  
  togglePlayState() {
    const { isPaused } = this.state;
    const { currentSound } = this.props;
    if (!currentSound) {
      return;
    }
    this.setState({ isPaused: !isPaused });
    console.log('togglePlayState', this.state.isPaused, currentSound);
    
    if (isPaused) {
      currentSound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else {
      currentSound.pause();
    }
  }
  
  toggleMuteState() {
    const { isMuted, value } = this.state;
    const { currentSound } = this.props;
    if (!currentSound) {
      return;
    }
    console.log('toggleMuteState', isMuted, currentSound);
    this.setState({ isMuted: !isMuted });
    
    if (currentSound) {
      currentSound.setVolume((!isMuted) ? 0 : value);
    }
  }
  
  startTimer() {
    const props = this.props;
    console.log('heartbeat', props);
    
    const heartbeat = setInterval(() => {
      this.props.currentSound.getCurrentTime((seconds) => {
        this.setState({ currentTime: seconds });
      });
    }, 1000);
    
    this.setState({ heartbeat });
  }
  
  setVolume(value) {
    console.log('setVolume()', value);
    this.setState({ value });
    
    const { currentSound } = this.props;
    if (currentSound) {
      currentSound.setVolume(value);
    }
  }
}

const hairline = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  controls: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
});

AudioControls.defaultProps = {
  backgroundColor: '#7da0be',
  controlsColor: '#435d74',
  title: 'AUDIO FILE TITLE',
  totalDuration: 0,
  currentSound: null,
};
