import {combineReducers, createStore} from "redux";
import {foodWeightReducer} from "./foodWeightReducer";

export type RootStoreType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    foodList: foodWeightReducer,
})

export const store = createStore(rootReducer)