import { ShoppingItem } from "@/types/shopping";
import { storageAdapter } from "./storageAdapter";

// Cross-platform storage service that works on both native and web
const STORAGE_KEY = "shoppingList";

export const localStorageService = {
  // Fetch all shopping items
  fetchItems: async (): Promise<ShoppingItem[]> => {
    try {
      const savedItems = await storageAdapter.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        return parsedItems;
      }
      return [];
    } catch (error) {
      console.error("Error fetching items from storage:", error);
      return [];
    }
  },

  // Add a new shopping item
  addItem: async (name: string, quantity: number): Promise<ShoppingItem> => {
    try {
      const items = await localStorageService.fetchItems();
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name,
        quantity,
        purchased: false,
        createdAt: new Date().toISOString(),
      };

      const updatedItems = [...items, newItem];
      await storageAdapter.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return newItem;
    } catch (error) {
      console.error("Error adding item to storage:", error);
      throw new Error("Failed to add item");
    }
  },

  // Update an existing shopping item
  updateItem: async (
    id: string,
    updates: { name?: string; quantity?: number },
  ): Promise<void> => {
    try {
      const items = await localStorageService.fetchItems();
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      );
      await storageAdapter.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error updating item in storage:", error);
      throw new Error("Failed to update item");
    }
  },

  // Delete a shopping item
  deleteItem: async (id: string): Promise<void> => {
    try {
      const items = await localStorageService.fetchItems();
      const updatedItems = items.filter((item) => item.id !== id);
      await storageAdapter.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error deleting item from storage:", error);
      throw new Error("Failed to delete item");
    }
  },

  // Toggle purchased status
  togglePurchased: async (id: string, purchased: boolean): Promise<void> => {
    try {
      const items = await localStorageService.fetchItems();
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, purchased } : item,
      );
      await storageAdapter.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error toggling purchased status in storage:", error);
      throw new Error("Failed to update item status");
    }
  },

  // Clear all items
  clearAll: async (): Promise<void> => {
    try {
      await storageAdapter.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw new Error("Failed to clear shopping list");
    }
  },

  // Clear purchased items only
  clearPurchased: async (): Promise<void> => {
    try {
      const items = await localStorageService.fetchItems();
      const unpurchasedItems = items.filter((item) => !item.purchased);
      await storageAdapter.setItem(
        STORAGE_KEY,
        JSON.stringify(unpurchasedItems),
      );
    } catch (error) {
      console.error("Error clearing purchased items from storage:", error);
      throw new Error("Failed to clear purchased items");
    }
  },
};
