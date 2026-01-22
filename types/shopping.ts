export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: string;
}

export interface ShoppingListState {
  items: ShoppingItem[];
  loading: boolean;
  error: string | null;
}

export interface AddItemAction {
  type: "ADD_ITEM";
  payload: Omit<ShoppingItem, "id" | "createdAt">;
}

export interface EditItemAction {
  type: "EDIT_ITEM";
  payload: {
    id: string;
    updates: Partial<Omit<ShoppingItem, "id" | "createdAt">>;
  };
}

export interface DeleteItemAction {
  type: "DELETE_ITEM";
  payload: string;
}

export interface TogglePurchasedAction {
  type: "TOGGLE_PURCHASED";
  payload: string;
}

export interface SetItemsAction {
  type: "SET_ITEMS";
  payload: ShoppingItem[];
}

export interface LoadingAction {
  type: "SET_LOADING";
  payload: boolean;
}

export interface ErrorAction {
  type: "SET_ERROR";
  payload: string | null;
}

export type ShoppingListAction =
  | AddItemAction
  | EditItemAction
  | DeleteItemAction
  | TogglePurchasedAction
  | SetItemsAction
  | LoadingAction
  | ErrorAction;
