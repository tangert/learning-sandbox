import { compose, applyMiddleware, createStore } from 'redux';
import rootReducer from  './reducers';
import {persistStore, autoRehydrate} from 'redux-persist'

let GlobalStore = compose(
  autoRehydrate()
)(createStore)(rootReducer);

persistStore(GlobalStore);
export default GlobalStore;
