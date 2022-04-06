import { createStore } from "redux";
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const enhencer = composeWithDevTools()

const store = createStore(rootReducer, enhencer);

export default store;