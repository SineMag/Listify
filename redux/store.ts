// redux/store.ts
import { createStore, combineReducers } from 'redux';
import shoppingListReducer from './reducers';

const rootReducer = combineReducers({
  shoppingList: shoppingListReducer,
});

const store = createStore(rootReducer);

export default store;
