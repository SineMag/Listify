import { combineReducers, createStore } from "redux";
import { shoppingListReducer } from "./shoppingListReducer";

const rootReducer = combineReducers({
  shoppingList: shoppingListReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
