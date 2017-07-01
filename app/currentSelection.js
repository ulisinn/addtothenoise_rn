import * as _ from 'lodash';

const getPortfolioAll = (all) => {
  return all.filter((o) => {
    return (
      o.category === 'print' ||
      o.category === 'web' ||
      o.category === 'other');
  });
};

export const getCurrentSelection = (category = 'ALL', all) => {
  if (category === 'ALL') {
    return getPortfolioAll(all);
  }
  
  return all.filter((o, i) => {
    return (o.category === category.toLowerCase());
  });
  
};

export const getSplashScreenSelection = (category, all) => {
  
  return all.filter((o) => {
    return (o.displayLandingPageImage);
  });
};

export const getSelectionById = (id, all) => {
  
  return all.filter((o) => {
    return (o.id === id);
  });
};
