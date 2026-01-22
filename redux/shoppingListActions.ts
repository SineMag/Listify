import {
  AddItemAction,
  DeleteItemAction,
  EditItemAction,
  ErrorAction,
  LoadingAction,
  SetItemsAction,
  TogglePurchasedAction,
} from "@/types/shopping";

export const addItem = (name: string, quantity: number): AddItemAction => ({
  type: "ADD_ITEM",
  payload: { name, quantity, purchased: false },
});

export const editItem = (
  id: string,
  updates: { name?: string; quantity?: number },
): EditItemAction => ({
  type: "EDIT_ITEM",
  payload: { id, updates },
});

export const deleteItem = (id: string): DeleteItemAction => ({
  type: "DELETE_ITEM",
  payload: id,
});

export const togglePurchased = (id: string): TogglePurchasedAction => ({
  type: "TOGGLE_PURCHASED",
  payload: id,
});

export const setItems = (items: any[]): SetItemsAction => ({
  type: "SET_ITEMS",
  payload: items,
});

export const setLoading = (loading: boolean): LoadingAction => ({
  type: "SET_LOADING",
  payload: loading,
});

export const setError = (error: string | null): ErrorAction => ({
  type: "SET_ERROR",
  payload: error,
});
