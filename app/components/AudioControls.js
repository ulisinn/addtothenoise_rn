import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Text,
} from 'react-native';

import Svg, {
  Rect,
  G,
  Path,
  Polygon,
} from 'react-native-svg';

import { Text as SvgText } from 'react-native-svg';

import Slider from 'react-native-slider';

export default class AudioControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.8,
      isPaused: true,
      isMuted: false,
      totalTime: '00:00',
      currentTime: '00:00',
    };
    
    this.togglePlayState = this.togglePlayState.bind(this);
    this.toggleMuteState = this.toggleMuteState.bind(this);
    this.getPlayButton = this.getPlayButton.bind(this);
  }
  
  render() {
    const { currentTime, totalTime, isMuted } = this.state;
    const togglePlayState = this.togglePlayState;
    
    return (
      <View style={[styles.container]}>
        <View style={[styles.controls, {
          borderColor: this.props.controlsColor,
          backgroundColor: this.props.backgroundColor,
        }]}>
          <Text style={[{ color: this.props.controlsColor }]}>{this.props.title}</Text>
          
          <Svg style={[styles.border]}
               width="300"
               height="50">
            {this.getPlayButton()}
            
            <G id='durationText'>
              <SvgText
                fill={this.props.controlsColor}
                fontSize="17"
                x="138"
                y="13.5"
                textAnchor="middle"
              >{currentTime} / {totalTime}</SvgText>
            </G>
            {this.getSpeakerButton()}
          
          </Svg>
          <Slider style={[styles.border]}
                  width={200}
                  thumbTintColor={this.props.controlsColor}
                  minimumTrackTintColor={this.props.controlsColor}
                  maximumTrackTintColor={`${this.props.controlsColor}33`}
                  minimumValue={0}
                  maximumValue={1}
                  value={(isMuted) ? 0 : this.state.value}
                  onValueChange={(value) => this.setState({ value })} />
        
        </View></View>
    );
  }
  
  getPlayButton() {
    const { isPaused } = this.state;
    const togglePlayState = this.togglePlayState;
    
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
    const toggleMuteState = this.toggleMuteState;
    
    if (isMuted) {
      return (
        <G id='mutedSpeaker'
           x='-27'
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
           x='-27'
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
    console.log('togglePlayState', isPaused);
    this.setState({ isPaused: !isPaused });
  }
  
  toggleMuteState() {
    const { isMuted } = this.state;
    console.log('toggleMuteState', isMuted);
    this.setState({ isMuted: !isMuted });
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
};
