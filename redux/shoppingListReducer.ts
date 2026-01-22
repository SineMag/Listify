import { ShoppingListAction, ShoppingListState } from "@/types/shopping";

const initialState: ShoppingListState = {
  items: [],
  loading: false,
  error: null,
};

export const shoppingListReducer = (
  state = initialState,
  action: ShoppingListAction,
): ShoppingListState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        items: [...state.items, newItem],
        error: null,
      };
    }

    case "EDIT_ITEM": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item,
        ),
        error: null,
      };
    }

    case "DELETE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        error: null,
      };
    }

    case "TOGGLE_PURCHASED": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, purchased: !item.purchased }
            : item,
        ),
        error: null,
      };
    }

    case "SET_ITEMS": {
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    default:
      return state;
  }
};
