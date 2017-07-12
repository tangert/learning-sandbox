import { createStore } from 'redux';
import rootReducer from  './reducers';

const store = (initialState) => {
    return createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const GlobalStore = store();
export default GlobalStore;
