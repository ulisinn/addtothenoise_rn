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
import PortfolioMainItem from '../../components/PortfolioMainItem';

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
    console.log('MainScreen willReceiveProps', nextProps);
  }
  
  render() {
    
    const { currentSelection, category } = this.props;
    const onNavPress = this.onNavPress;
    const onNavigateToDetail = this.onNavigateToDetail;
    const getListItem = this.getListItem;
    
    console.log('MainScreen render', currentSelection);
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
        
        {/*        <FlatList style={{ marginTop: 40 }}
                  data={currentSelection}
                  renderItem={({ item }) => <Text
                    onPress={() => onNavigateToDetail(item.id)}>{item.id}: {item.title}</Text>}
        /> */}
        
        <FlatList style={{ marginTop: 40 }}
                  data={currentSelection}
                  renderItem={({ item }) => <PortfolioMainItem
                    onNavigateToDetail={() => onNavigateToDetail(item.id)}
                    src={item.mainImage}
                    id={item.id}
                    description={item.title}
                  />}
        />
      </View>
    );
  }
  
  getListItem(item) {
    const onNavigateToDetail = this.onNavigateToDetail;
    console.log('getListItem', item);
    return <PortfolioMainItem
      onNavigateToDetail={() => onNavigateToDetail(item.id)}
      src={item.src}
      id={item.id}
      description={item.title}
    />;
  }
  
  onNavPress(label) {
    console.log('onNavPress', label, store);
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