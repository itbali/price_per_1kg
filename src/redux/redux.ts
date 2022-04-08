import {combineReducers, createStore, Store} from "redux";
import {foodWeightReducer} from "./foodWeightReducer";

const rootReducer = combineReducers(foodWeightReducer)
export const store:Store = createStore(rootReducer)