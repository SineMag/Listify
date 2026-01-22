// redux/reducers.ts
import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, TOGGLE_PURCHASED, SET_ITEMS } from './actions';
import { ShoppingItem } from '../types';

interface ShoppingListState {
  items: ShoppingItem[];
}

const initialState: ShoppingListState = {
  items: [],
};

const shoppingListReducer = (state = initialState, action: any): ShoppingListState => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case TOGGLE_PURCHASED:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, purchased: !item.purchased } : item
        ),
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default shoppingListReducer;
