import { ShoppingItem } from "@/types/shopping";
import { localStorageService } from "./localStorageService";

// Service that uses localStorage for all shopping list operations
export const shoppingListService = {
  // Fetch all shopping items
  fetchItems: async (): Promise<ShoppingItem[]> => {
    return await localStorageService.fetchItems();
  },

  // Add a new shopping item
  addItem: async (name: string, quantity: number): Promise<ShoppingItem> => {
    return await localStorageService.addItem(name, quantity);
  },

  // Update an existing shopping item
  updateItem: async (
    id: string,
    updates: { name?: string; quantity?: number },
  ): Promise<void> => {
    await localStorageService.updateItem(id, updates);
  },

  // Delete a shopping item
  deleteItem: async (id: string): Promise<void> => {
    await localStorageService.deleteItem(id);
  },

  // Toggle purchased status
  togglePurchased: async (id: string, purchased: boolean): Promise<void> => {
    await localStorageService.togglePurchased(id, purchased);
  },

  // Clear all items
  clearAll: async (): Promise<void> => {
    await localStorageService.clearAll();
  },

  // Clear purchased items only
  clearPurchased: async (): Promise<void> => {
    await localStorageService.clearPurchased();
  },
};
