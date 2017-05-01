import {
  Store,
  createStore
} from 'redux';
import { rootReducer, IAppState } from './reducers';
 
export const store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension()
) as Store<IAppState>;
