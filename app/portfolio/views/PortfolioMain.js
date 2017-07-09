'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import * as _ from 'lodash';
import store from '../../store';

import { getCurrentSelection, getSplashScreenSelection } from '../../currentSelection';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR } from '../../styles/global';
import LocalNav from '../../components/LocalNav';
import PortfolioMainItem from '../../components/PortfolioMainItem';
import MusicMainItem from '../../components/MusicMainItem';

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
    this.onNavigateToDetail = this.onNavigateToDetail.bind(this);
    this.getListItem = this.getListItem.bind(this);
  }
  
  willReceiveProps(nextProps) {
    //console.log('MainScreen willReceiveProps', nextProps);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    //console.log('......... nextProps', nextProps.category, this.props.category);
    return (nextProps.category !== this.props.category);
  }
  
  render() {
    
    const { currentSelection, category } = this.props;
    const onNavPress = this.onNavPress;
    const onNavigateToDetail = this.onNavigateToDetail;
    const getListItem = this.getListItem;
    
    //console.log('MainScreen render', currentSelection);
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LocalNav label={['ALL', 'PRINT', 'WEB', 'OTHER', 'MUSIC']}
                  onNavPress={(label) => onNavPress(label)}
                  currentCategory={category}
        />
        
        <FlatList style={{ marginTop: 40 }}
                  data={currentSelection}
                  renderItem={({ item }) => {
                    return getListItem(item);
                  }}
        />
      </View>
    );
  }
  
  getListItem(item) {
    const onNavigateToDetail = this.onNavigateToDetail;
    const { category } = this.props;
    // console.log(category, 'getListItem', item.backgroundColor);
    
    return (category === 'MUSIC') ? <MusicMainItem
        onNavigateToDetail={() => onNavigateToDetail(item.id)}
        src={item.mainImage}
        id={item.id}
        key={item.id}
        description={item.title}
        category={category}
        backgroundColor={item.backgroundColor}
      />
      :
      <PortfolioMainItem
        onNavigateToDetail={() => onNavigateToDetail(item.id)}
        src={item.mainImage}
        id={item.id}
        key={item.id}
        description={item.title}
        category={category}
      />;
  }
  
  onNavPress(label) {
    //console.log('onNavPress', label, store);
    store.dispatch(actionCreators.setCurrentCategory(label));
  }
  
  onNavigateToDetail(id) {
    this.props.navigation.navigate('PortfolioDetail', { id });
  }
}


MainScreen.defaultProps = {
  currentSelection: [],
};

const mapStateToProps = (state) => {
  //console.log('mapStateToProps', state.portfolioReducer);
  const currentSelection = _.shuffle(getCurrentSelection(state.portfolioReducer.category, state.portfolioReducer.all));
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