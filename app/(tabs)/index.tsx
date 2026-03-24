import { AddItemForm } from "@/components/AddItemForm";
import { Confetti } from "@/components/Confetti";
import { ShoppingItem } from "@/components/ShoppingItem";
import { Toast } from "@/components/Toast";
import { Button, Card } from "@/components/ui";
import { Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  addItem,
  deleteItem,
  editItem,
  setError,
  setItems,
  setLoading,
  togglePurchased,
} from "@/redux/shoppingListActions";
import { RootState } from "@/redux/store";
import { shoppingListService } from "@/supabase/unifiedShoppingService";
import { ShoppingItem as ShoppingItemType } from "@/types/shopping";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.shoppingList,
  );
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItemType | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previousPurchasedCount, setPreviousPurchasedCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "quantity" | "date">("date");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    visible: boolean;
  }>({ message: "", type: "info", visible: false });

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error, "error");
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  // Monitor for all items purchased to trigger confetti
  useEffect(() => {
    const allPurchased = items.length > 0 && items.every((i) => i.purchased);

    // Only trigger confetti once when all items become purchased
    if (allPurchased && showConfetti === false) {
      setShowConfetti(true);
      showToast("🎉 Congratulations! All items purchased!", "success");
    }
  }, [items, showConfetti]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const loadItems = async () => {
    try {
      dispatch(setLoading(true));
      const fetchedItems = await shoppingListService.fetchItems();
      dispatch(setItems(fetchedItems));
      setPreviousPurchasedCount(
        fetchedItems.filter((item) => item.purchased).length,
      );
    } catch (err: any) {
      const errorMessage = err.message || "Failed to load shopping list";
      dispatch(setError(errorMessage));
      showToast(errorMessage, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddItem = async (name: string, quantity: number) => {
    try {
      dispatch(setLoading(true));
      const newItem = await shoppingListService.addItem(name, quantity);
      dispatch(addItem(name, quantity));
      setShowAddForm(false);
      showToast("Item added successfully!", "success");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to add item";
      dispatch(setError(errorMessage));
      showToast(errorMessage, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditItem = (item: ShoppingItemType) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleUpdateItem = async (name: string, quantity: number) => {
    if (editingItem) {
      try {
        dispatch(setLoading(true));
        await shoppingListService.updateItem(editingItem.id, {
          name,
          quantity,
        });
        dispatch(editItem(editingItem.id, { name, quantity }));
        setEditingItem(null);
        setShowAddForm(false);
        showToast("Item updated successfully!", "success");
      } catch (err: any) {
        const errorMessage = err.message || "Failed to update item";
        dispatch(setError(errorMessage));
        showToast(errorMessage, "error");
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleDeleteItem = (id: string) => {
    console.log("handleDeleteItem called with ID:", id);

    // For web, we'll use the browser's confirm dialog
    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?",
      );
      if (!confirmDelete) {
        console.log("Delete operation cancelled by user");
        return;
      }

      (async () => {
        try {
          console.log("Starting delete operation for item ID:", id);
          dispatch(setLoading(true));
          await shoppingListService.deleteItem(id);
          console.log("Item deleted from storage, updating UI...");
          dispatch(deleteItem(id));
          showToast("Item deleted successfully!", "success");
        } catch (err: any) {
          console.error("Error deleting item:", err);
          // If we get here, both Supabase and localStorage failed
          if (
            err.message ===
            "Failed to delete item from both Supabase and localStorage"
          ) {
            // Still update the UI to reflect the deletion if possible
            dispatch(deleteItem(id));
            showToast("Item removed from list (offline mode)", "info");
          } else {
            const errorMessage = err.message || "Failed to delete item";
            dispatch(setError(errorMessage));
            showToast(errorMessage, "error");
          }
        } finally {
          dispatch(setLoading(false));
        }
      })();
    } else {
      // Original mobile implementation
      Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Starting delete operation for item ID:", id);
              dispatch(setLoading(true));
              await shoppingListService.deleteItem(id);
              console.log("Item deleted from storage, updating UI...");
              dispatch(deleteItem(id));
              showToast("Item deleted successfully!", "success");
            } catch (err: any) {
              console.error("Error deleting item:", err);
              if (
                err.message ===
                "Failed to delete item from both Supabase and localStorage"
              ) {
                dispatch(deleteItem(id));
                showToast("Item removed from list (offline mode)", "info");
              } else {
                const errorMessage = err.message || "Failed to delete item";
                dispatch(setError(errorMessage));
                showToast(errorMessage, "error");
              }
            } finally {
              dispatch(setLoading(false));
            }
          },
        },
      ]);
    }
  };

  const handleTogglePurchased = async (id: string) => {
    try {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      const newPurchasedStatus = !item.purchased;
      await shoppingListService.togglePurchased(id, newPurchasedStatus);
      dispatch(togglePurchased(id));
      showToast(
        newPurchasedStatus ? "Item marked as purchased!" : "Item unmarked!",
        "success",
      );

      // Check if all items are now purchased
      const updatedItems = items.map((i) =>
        i.id === id ? { ...i, purchased: newPurchasedStatus } : i,
      );
      const allPurchased =
        updatedItems.length > 0 && updatedItems.every((i) => i.purchased);

      // Show confetti when all items are purchased and it wasn't already all purchased
      if (allPurchased && !items.every((i) => i.purchased)) {
        setShowConfetti(true);
        showToast("🎉 Congratulations! All items purchased!", "success");
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update item status";
      dispatch(setError(errorMessage));
      showToast(errorMessage, "error");
    }
  };

  const renderItem = ({ item }: { item: ShoppingItemType }) => (
    <ShoppingItem
      item={item}
      onTogglePurchased={handleTogglePurchased}
      onEdit={handleEditItem}
      onDelete={handleDeleteItem}
    />
  );

  const purchasedCount = items.filter((item) => item.purchased).length;
  const totalCount = items.length;

  if (showAddForm) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {editingItem ? "Edit Item" : "Add New Item"}
          </Text>
        </View>
        <AddItemForm
          onAddItem={editingItem ? handleUpdateItem : handleAddItem}
          onCancel={() => {
            setShowAddForm(false);
            setEditingItem(null);
          }}
          initialItem={editingItem}
          submitText={editingItem ? "Update Item" : "Add Item"}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Confetti
        visible={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          My Shopping List
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {purchasedCount} of {totalCount} items purchased
        </Text>
      </View>

      <Button
        title="Add New Item"
        onPress={() => setShowAddForm(true)}
        variant="primary"
        style={styles.addButton}
        disabled={loading}
        accessibilityLabel="Add new item to shopping list"
        accessibilityHint="Opens a form to add a new item to your shopping list"
      />

      {loading && items.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading your shopping list...
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Card style={styles.emptyCard}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Your shopping list is empty. Add some items to get started!
              </Text>
            </Card>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80, // Space for tab bar
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.lg + 20, // Extra top padding
    alignItems: "center",
  },
  title: {
    fontSize: Typography.title.fontSize,
    fontWeight: "bold",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.caption.fontSize,
  },
  addButton: {
    margin: Spacing.md,
  },
  list: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    marginTop: Spacing.xl,
  },
  emptyText: {
    fontSize: Typography.body.fontSize,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.body.fontSize,
  },
});
