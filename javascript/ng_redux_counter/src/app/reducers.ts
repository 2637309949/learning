import {
  combineReducers
} from 'redux';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from './actions';

export interface IAppState {
  counter: number;
}

const COUNTER_INITIAL_STATE = 0;
function counter(state = COUNTER_INITIAL_STATE, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter: counter
});
