import { StyleSheet } from 'react-native';

export const BG_COLOR = '#ffffff';
export const BAR_COLOR = '#4e4d52';
export const TEXT_COLOR = 'rgb(191,190,178)';
export const HEADER_TEXT_COLOR = '#fff';
export const MUTED_COLOR = '#8e8786';
export const LINK_COLOR = '#48e9d9';
export const ACCENT_COLORS = ['#d31d65', '#751c53', '#c248c0', '#7d6e8b', '#bbc6f7'];

export const VEGUR_BOLD = 'Vegur-Bold';
export const VEGUR_LIGHT = 'Vegur-Light';
export const VEGUR_MEDIUM = 'Vegur-Medium';
export const VEGUR_REGULAR = 'Vegur-Regular';


export const COMMON_STYLES = StyleSheet.create({
  pageContainer: {
    backgroundColor: BG_COLOR,
    flex: 1,
    marginTop: 0,
    paddingTop: 20,
    marginBottom: 48,
    marginHorizontal: 0,
    paddingHorizontal: 10,
  },
  text: {
    color: TEXT_COLOR,
    fontFamily: VEGUR_BOLD,
  },
  localNavItem: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: TEXT_COLOR,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightColor: TEXT_COLOR,
    marginRight: 40,
  },
  localNavItemSelected: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: TEXT_COLOR,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightColor: TEXT_COLOR,
    backgroundColor: TEXT_COLOR,
    marginRight: 40,
  },
  localNavTextSelected: {
    color: 'white',
    fontFamily: VEGUR_BOLD,
  },
  localNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
    
    // borderWidth: 1,
  },
});
