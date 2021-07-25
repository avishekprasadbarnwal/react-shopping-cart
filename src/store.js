  
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers({
    products: productsReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);



