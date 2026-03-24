import { ShoppingItem } from "@/types/shopping";

// LocalStorage fallback service for when Supabase is not available
const STORAGE_KEY = "shoppingList";

export const localStorageService = {
  // Fetch all shopping items
  fetchItems: async (): Promise<ShoppingItem[]> => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        return parsedItems;
      }
      return [];
    } catch (error) {
      console.error("Error fetching items from localStorage:", error);
      throw new Error("Failed to load shopping list");
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return newItem;
    } catch (error) {
      console.error("Error adding item to localStorage:", error);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error updating item in localStorage:", error);
      throw new Error("Failed to update item");
    }
  },

  // Delete a shopping item
  deleteItem: async (id: string): Promise<void> => {
    try {
      const items = await localStorageService.fetchItems();
      const updatedItems = items.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error deleting item from localStorage:", error);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error toggling purchased status in localStorage:", error);
      throw new Error("Failed to update item status");
    }
  },

  // Clear all items
  clearAll: async (): Promise<void> => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      throw new Error("Failed to clear shopping list");
    }
  },

  // Clear purchased items only
  clearPurchased: async (): Promise<void> => {
    try {
      const items = await localStorageService.fetchItems();
      const unpurchasedItems = items.filter((item) => !item.purchased);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unpurchasedItems));
    } catch (error) {
      console.error("Error clearing purchased items from localStorage:", error);
      throw new Error("Failed to clear purchased items");
    }
  },
};
