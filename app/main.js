import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Orientation from 'react-native-orientation';
import { Provider } from 'react-redux';

import store, { REMOTE_LOAD_SUCCESS } from './store';

import * as GLOBAL_STYLES from './styles/global';

import TabBarNavigation from './tabBar/views/TabBarNavigation';


export default class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      orientation: null,
    };
    
    this.getDimensions = this.getDimensions.bind(this);
    this.onLayoutChanged = this.onLayoutChanged.bind(this);
    this.onOrientationChange = this.onOrientationChange.bind(this);
  }
  
  componentWillMount() {
    const orientation = Orientation.getInitialOrientation();
    this.setState({ orientation });
  }
  
  componentDidMount() {
    Orientation.addOrientationListener(this.onOrientationChange);
  }
  
  componentWillUnmount() {
    Orientation.removeOrientationListener(this.onOrientationChange);
  }
  
  getDimensions = (evt = {}) => {
    //console.log('Dimensions', Dimensions.get('window'));
    return Dimensions;
  };
  
  onLayoutChanged = (evt) => {
    //console.log('===== onLayoutChanged', evt);
    return this.getDimensions(evt);
  };
  
  onOrientationChange = (orientation) => {
    this.setState({ orientation });
  };
  
  render() {
    const state = store.getState().loadRemoteContent;
    //console.log('Main render', state);
    if (!state.loadRemoteContent === REMOTE_LOAD_SUCCESS) {
      return null;
    } else {
      return (
        <Provider store={store}>
          <TabBarNavigation onLayout={(evt) => this.onLayoutChanged(evt)} />
        </Provider>
      );
      
    }
  }
}

const MAIN_VIEW = StyleSheet.create({
  pageContainer: {
    backgroundColor: GLOBAL_STYLES.BG_COLOR,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 0,
    paddingTop: 20,
    marginBottom: 48,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'green',
  },
  contentPanel: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    padding: 5,
  },
});
