import { compose, applyMiddleware, createStore } from 'redux';
import rootReducer from  './reducers';
import {persistStore, autoRehydrate} from 'redux-persist'

const store = (initialState) => {
    return createStore(rootReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const GlobalStore = store();
persistStore(GlobalStore)
export default GlobalStore;
