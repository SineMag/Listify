/**
 * Shopping List Reducer Tests
 * 
 * These tests verify that the Redux reducer correctly handles all actions
 * for managing the shopping list state.
 */

import {
  addItem,
  deleteItem,
  editItem,
  setError,
  setItems,
  setLoading,
  togglePurchased,
} from "../redux/shoppingListActions";
import { shoppingListReducer } from "../redux/shoppingListReducer";
import { ShoppingListState } from "../types/shopping";

describe("shoppingListReducer", () => {
  const initialState: ShoppingListState = {
    items: [],
    loading: false,
    error: null,
  };

  const mockItem = {
    id: "1",
    name: "Milk",
    quantity: 2,
    purchased: false,
    createdAt: new Date().toISOString(),
  };

  it("should return initial state", () => {
    expect(shoppingListReducer(undefined, { type: "UNKNOWN" as any })).toEqual(
      initialState
    );
  });

  it("should handle ADD_ITEM action", () => {
    const action = addItem("Milk", 2);
    const newState = shoppingListReducer(initialState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].name).toBe("Milk");
    expect(newState.items[0].quantity).toBe(2);
    expect(newState.items[0].purchased).toBe(false);
    expect(newState.error).toBeNull();
  });

  it("should handle EDIT_ITEM action", () => {
    const stateWithItem: ShoppingListState = {
      ...initialState,
      items: [mockItem],
    };
    const action = editItem("1", { name: "Whole Milk", quantity: 3 });
    const newState = shoppingListReducer(stateWithItem, action);

    expect(newState.items[0].name).toBe("Whole Milk");
    expect(newState.items[0].quantity).toBe(3);
    expect(newState.error).toBeNull();
  });

  it("should handle DELETE_ITEM action", () => {
    const stateWithItem: ShoppingListState = {
      ...initialState,
      items: [mockItem],
    };
    const action = deleteItem("1");
    const newState = shoppingListReducer(stateWithItem, action);

    expect(newState.items).toHaveLength(0);
    expect(newState.error).toBeNull();
  });

  it("should handle TOGGLE_PURCHASED action", () => {
    const stateWithItem: ShoppingListState = {
      ...initialState,
      items: [mockItem],
    };
    const action = togglePurchased("1");
    const newState = shoppingListReducer(stateWithItem, action);

    expect(newState.items[0].purchased).toBe(true);
    expect(newState.error).toBeNull();
  });

  it("should handle SET_ITEMS action", () => {
    const items = [mockItem, { ...mockItem, id: "2", name: "Bread" }];
    const action = setItems(items);
    const newState = shoppingListReducer(initialState, action);

    expect(newState.items).toEqual(items);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });

  it("should handle SET_LOADING action", () => {
    const action = setLoading(true);
    const newState = shoppingListReducer(initialState, action);

    expect(newState.loading).toBe(true);
  });

  it("should handle SET_ERROR action", () => {
    const action = setError("Something went wrong");
    const newState = shoppingListReducer(initialState, action);

    expect(newState.error).toBe("Something went wrong");
    expect(newState.loading).toBe(false);
  });
});

