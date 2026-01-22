// types.ts
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  created_at: string; // ISO date string
}

export interface RootState {
  shoppingList: {
    items: ShoppingItem[];
  };
}
