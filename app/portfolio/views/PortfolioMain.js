'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import store from '../../store';

import { getCurrentSelection, getSplashScreenSelection } from '../../currentSelection';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';
import LocalNav from '../../components/LocalNav';

class MainScreen extends React.Component {
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
    this.onNavPress = this.onNavPress.bind(this);
  }
  
  willReceiveProps(nextProps) {
    console.log('MainScreen willReceiveProps', nextProps);
  }
  
  render() {
    
    const { currentSelection } = this.props;
    const onNavPress = this.onNavPress;
    
    console.log('MainScreen render', currentSelection);
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LocalNav label={['ALL', 'PRINT', 'WEB', 'OTHER', 'MUSIC']}
                  onNavPress={(label) => onNavPress(label)} />
        
        <FlatList style={{ marginTop: 40 }}
                  data={currentSelection}
                  renderItem={({ item }) => <Text>{item.id}: {item.title}</Text>}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PortfolioDetail', { id: 11 })}
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
          >
            {'Portfolio Detail'}
          </Text>
        </TouchableOpacity>
      
      </View>
    );
  }
  
  onNavPress(label) {
    console.log('onNavPress', label, store);
    store.dispatch(actionCreators.setCurrentCategory(label));
    // this.props.navigation.navigate('PortfolioMain');
  }
}


MainScreen.defaultProps = {
  currentSelection: [],
};

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state.portfolioReducer);
  const currentSelection = getCurrentSelection(state.portfolioReducer.category, state.portfolioReducer.all);
  return {
    category: state.portfolioReducer.category,
    currentSelection: currentSelection,
    portfolioPageIndex: state.tabOne.index,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PortfolioMain = connect(mapStateToProps, mapDispatchToProps)(MainScreen);
export default PortfolioMain;