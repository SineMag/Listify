import { ShoppingItem } from "@/types/shopping";
import { localStorageService } from "./localStorageService";
import {
  addShoppingItem as supabaseAddItem,
  clearAllShoppingItems as supabaseClearAll,
  deleteShoppingItem as supabaseDeleteItem,
  fetchShoppingItems as supabaseFetchItems,
  togglePurchasedStatus as supabaseTogglePurchased,
  updateShoppingItem as supabaseUpdateItem,
} from "./shoppingListService";

// Unified service that tries Supabase first, falls back to localStorage
export const shoppingListService = {
  // Fetch all shopping items
  fetchItems: async (): Promise<ShoppingItem[]> => {
    try {
      // Try Supabase first
      return await supabaseFetchItems();
    } catch (error) {
      console.log("Supabase failed, using localStorage fallback");
      // Fall back to localStorage
      return await localStorageService.fetchItems();
    }
  },

  // Add a new shopping item
  addItem: async (name: string, quantity: number): Promise<ShoppingItem> => {
    try {
      // Try Supabase first
      return await supabaseAddItem(name, quantity);
    } catch (error) {
      console.log("Supabase failed, using localStorage fallback");
      // Fall back to localStorage
      return await localStorageService.addItem(name, quantity);
    }
  },

  // Update an existing shopping item
  updateItem: async (
    id: string,
    updates: { name?: string; quantity?: number },
  ): Promise<void> => {
    try {
      // Try Supabase first
      await supabaseUpdateItem(id, updates);
    } catch (error) {
      console.log("Supabase failed, using localStorage fallback");
      // Fall back to localStorage
      await localStorageService.updateItem(id, updates);
    }
  },

  // Delete a shopping item
  deleteItem: async (id: string): Promise<void> => {
    try {
      // Try Supabase first
      await supabaseDeleteItem(id);
      console.log("Item deleted from Supabase");
    } catch (error) {
      console.log("Supabase failed, using localStorage fallback", error);
      try {
        // Fall back to localStorage
        await localStorageService.deleteItem(id);
        console.log("Item deleted from localStorage");
      } catch (localError) {
        console.error("Failed to delete item from localStorage:", localError);
        throw new Error(
          "Failed to delete item from both Supabase and localStorage",
        );
      }
    }
  },

  // Toggle purchased status
  togglePurchased: async (id: string, purchased: boolean): Promise<void> => {
    try {
      // Try Supabase first
      await supabaseTogglePurchased(id, purchased);
    } catch (error) {
      console.log("Supabase failed, using localStorage fallback");
      // Fall back to localStorage
      await localStorageService.togglePurchased(id, purchased);
    }
  },

  // Clear all items
  clearAll: async (): Promise<void> => {
    try {
      // Try Supabase first
      await supabaseClearAll();
    } catch (error) {
      console.log("Supabase failed, using localStorage fallback");
      // Fall back to localStorage
      await localStorageService.clearAll();
    }
  },

  // Clear purchased items only
  clearPurchased: async (): Promise<void> => {
    try {
      // Try localStorage first for clear operations
      await localStorageService.clearPurchased();
    } catch (error) {
      console.error("Failed to clear purchased items:", error);
      throw new Error("Failed to clear purchased items");
    }
  },
};
