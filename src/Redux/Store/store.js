// Store for whole project

import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from '../Reducer/index'

const initialState = {};

const middleware = [thunk, logger];

const Store = createStore(rootReducer, initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default Store; 