import { supabase } from "./client";
import { ShoppingItem } from "@/types/shopping";

export interface ShoppingItemDB {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  created_at: string;
}

// Convert database item to app item
const dbToApp = (dbItem: ShoppingItemDB): ShoppingItem => ({
  id: dbItem.id,
  name: dbItem.name,
  quantity: dbItem.quantity,
  purchased: dbItem.purchased,
  createdAt: dbItem.created_at,
});

// Convert app item to database item
const appToDb = (appItem: Omit<ShoppingItem, "id" | "createdAt"> & { id?: string }): Partial<ShoppingItemDB> => ({
  name: appItem.name,
  quantity: appItem.quantity,
  purchased: appItem.purchased,
});

// Fetch all shopping items
export const fetchShoppingItems = async (): Promise<ShoppingItem[]> => {
  try {
    const { data, error } = await supabase
      .from("shopping_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data || []).map(dbToApp);
  } catch (error) {
    console.error("Error fetching shopping items:", error);
    throw new Error("Failed to load shopping list");
  }
};

// Add a new shopping item
export const addShoppingItem = async (
  name: string,
  quantity: number
): Promise<ShoppingItem> => {
  try {
    const { data, error } = await supabase
      .from("shopping_items")
      .insert([{ name, quantity, purchased: false }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return dbToApp(data);
  } catch (error) {
    console.error("Error adding shopping item:", error);
    throw new Error("Failed to add item");
  }
};

// Update a shopping item
export const updateShoppingItem = async (
  id: string,
  updates: Partial<Omit<ShoppingItem, "id" | "createdAt">>
): Promise<ShoppingItem> => {
  try {
    const { data, error } = await supabase
      .from("shopping_items")
      .update(appToDb(updates as any))
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return dbToApp(data);
  } catch (error) {
    console.error("Error updating shopping item:", error);
    throw new Error("Failed to update item");
  }
};

// Delete a shopping item
export const deleteShoppingItem = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("shopping_items")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting shopping item:", error);
    throw new Error("Failed to delete item");
  }
};

// Toggle purchased status
export const togglePurchasedStatus = async (
  id: string,
  purchased: boolean
): Promise<ShoppingItem> => {
  try {
    const { data, error } = await supabase
      .from("shopping_items")
      .update({ purchased })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return dbToApp(data);
  } catch (error) {
    console.error("Error toggling purchased status:", error);
    throw new Error("Failed to update item status");
  }
};

