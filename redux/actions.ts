// redux/actions.ts
import { ShoppingItem } from '../types';

// Action Types
export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const TOGGLE_PURCHASED = 'TOGGLE_PURCHASED';
export const SET_ITEMS = 'SET_ITEMS';

// Action Creators
export const addItem = (item: ShoppingItem) => ({
  type: ADD_ITEM,
  payload: item,
});

export const editItem = (item: ShoppingItem) => ({
  type: EDIT_ITEM,
  payload: item,
});

export const deleteItem = (id: string) => ({
  type: DELETE_ITEM,
  payload: id,
});

export const togglePurchased = (id: string) => ({
  type: TOGGLE_PURCHASED,
  payload: id,
});

export const setItems = (items: ShoppingItem[]) => ({
  type: SET_ITEMS,
  payload: items,
});
