import * as _ from 'lodash';

const getPortfolioAll = (all) => {
  const res = all.filter((o) => {
    return (
      o.category === 'print' ||
      o.category === 'web' ||
      o.category === 'other') ? true : false;
  });
  
  console.log('getPortfolioAll', res);
  return res;
};

export const getCurrentSelection = (category, all) => {
  if (category === 'all') {
    return getPortfolioAll(all);
  }
  
  return all.filter((o) => {
    return (o.category === category) ? true : false;
  });
  
};

export const getSplashScreenSelection = (category, all) => {
  
  const res = all.filter((o) => {
    return (o.displayLandingPageImage) ? true : false;
  });
  
  return res;
};

