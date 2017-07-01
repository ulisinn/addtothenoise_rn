/**
 * Created by ulrichsinn on 04/21/2017.
 */
/**
 * Created by ulrichsinn on 04/21/2017.
 */
import { INIT_PORTFOLIO, SPLASH, ABOUT, OPINION, ALL } from '../store';

const intitialState = {
  all: [],
  category: SPLASH,
};

export default function portfolioReducer(state = intitialState, action) {
  //console.log('INIT_PORTFOLIO', action.type);
  switch (action.type) {
    case INIT_PORTFOLIO: {
      console.log('====== INIT_PORTFOLIO', action.payload.data);
      return {
        ...state,
        ...action.payload.data,
      };
    }
    case 'Navigation/NAVIGATE':
      console.log('====== Navigation/NAVIGATE', action);
      return {
        ...state,
        category: (action.routeName === 'PortfolioMain') ? ALL : action.routeName,
      };
    
    case ALL:
      return {
        ...state,
        category: ALL,
      };
    
    default:
      console.log('****** INIT_PORTFOLIO', action.type);
      
      return state;
  }
}
