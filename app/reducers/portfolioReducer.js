/**
 * Created by ulrichsinn on 04/21/2017.
 */
/**
 * Created by ulrichsinn on 04/21/2017.
 */
import { INIT_PORTFOLIO, SPLASH, ABOUT, OPINION, SET_CURRENT_CATEGORY } from '../store';

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
    
    case SET_CURRENT_CATEGORY:
      console.log('****** SET_CURRENT_CATEGORY', action);
      
      return {
        ...state,
        category: action.payload.currentCategory,
      };
    
    default:
      console.log('****** INIT_PORTFOLIO', action.type);
      
      return state;
  }
}
