/**
 * Created by ulrichsinn on 04/21/2017.
 */
/**
 * Created by ulrichsinn on 04/21/2017.
 */
import { INIT_PORTFOLIO } from '../store';

export default function portfolioReducer(state = {}, action) {
  console.log('INIT_PORTFOLIO', action.type === INIT_PORTFOLIO, action.type);
  switch (action.type) {
    case INIT_PORTFOLIO: {
      console.log('====== INIT_PORTFOLIO', action.payload.data);
      return {
        ...state,
        ...action.payload.data,
      };
    }
    default:
      console.log('****** INIT_PORTFOLIO', action.type);
      
      return state;
  }
}
