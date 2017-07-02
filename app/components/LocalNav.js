import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { VEGUR_BOLD, TEXT_COLOR, COMMON_STYLES } from '../styles/global';

export default class LocalNav extends Component {
  constructor(props) {
    super(props);
    this.getNavItems = this.getNavItems.bind(this);
  }
  
  render() {
    const { onNavPress, label } = this.props;
    const getNavItems = this.getNavItems;
    const navItems = getNavItems();
    return (
      <View style={[COMMON_STYLES.localNav]}>
        {navItems}
      </View>
    );
  }
  
  getNavItems() {
    const { onNavPress, label, currentCategory } = this.props;
    
    return label.map((d, i) => {
      const marginR = (i === label.length - 1) ? 30 : 10;
      
      if (currentCategory !== d) {
        return <View key={i} style={[COMMON_STYLES.localNavItem, { marginRight: marginR }]}><Text
          onPress={() => onNavPress(d)}
          style={[COMMON_STYLES.text, { padding: 5, paddingTop: 7 }]}>{d}</Text></View>;
      } else {
        return <View key={i} style={[COMMON_STYLES.localNavItemSelected, { marginRight: marginR }]}><Text
          style={[COMMON_STYLES.localNavTextSelected, {
            padding: 5,
            paddingTop: 7,
          }]}>{d}</Text></View>;
      }
    });
  }
}