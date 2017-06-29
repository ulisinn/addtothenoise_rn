import { Dimensions as RNDimensions } from 'react-native';

const tablet = {
  width: 552,
  height: 960
};


const isTablet = () => {
  const { width, height } = RNDimensions.get('window');
  
  return {
    width: Math.max(width, height),
    height: Math.min(width, height)
  };
};

class Dimensions {
  
  getPortraitDimensions() {
    const { width, height } = RNDimensions.get('window');
    
    return {
      width: Math.min(width, height),
      height: Math.max(width, height)
    };
  };
  
  getLandscapeDimensions() {
    const { width, height } = RNDimensions.get('window');
    
    return {
      width: Math.max(width, height),
      height: Math.min(width, height)
    };
  };
  
  isPhone() {
    const dim = this.getPortraitDimensions();
    return dim.height < tablet.height;
  };
  
  isTablet() {
    const dim = this.getPortraitDimensions();
    return dim.height >= tablet.height;
  };
}

const dimensions = new Dimensions();
export default dimensions;