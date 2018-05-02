import { compose, applyMiddleware, createStore } from 'redux'
import rootReducer from  './reducers'
import {persistStore, autoRehydrate} from 'redux-persist'

let GlobalStore = compose(
  autoRehydrate()
  // ,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(rootReducer);

// persistStore(GlobalStore);
export default GlobalStore;
