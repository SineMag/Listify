import { AddItemForm } from "@/components/AddItemForm";
import { ShoppingItem } from "@/components/ShoppingItem";
import { Button, Card } from "@/components/ui";
import { Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  addItem,
  deleteItem,
  editItem,
  setError,
  setItems,
  togglePurchased,
} from "@/redux/shoppingListActions";
import { RootState } from "@/redux/store";
import { ShoppingItem as ShoppingItemType } from "@/types/shopping";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.shoppingList,
  );
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItemType | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  const loadItems = () => {
    try {
      const savedItems = localStorage.getItem("shoppingList");
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        dispatch(setItems(parsedItems));
      }
    } catch (err) {
      dispatch(setError("Failed to load shopping list"));
    }
  };

  const saveItems = (itemsToSave: ShoppingItemType[]) => {
    try {
      localStorage.setItem("shoppingList", JSON.stringify(itemsToSave));
    } catch (err) {
      dispatch(setError("Failed to save shopping list"));
    }
  };

  const handleAddItem = (name: string, quantity: number) => {
    dispatch(addItem(name, quantity));
    setShowAddForm(false);

    const updatedItems = [
      ...items,
      {
        id: Date.now().toString(),
        name,
        quantity,
        purchased: false,
        createdAt: new Date().toISOString(),
      },
    ];
    saveItems(updatedItems);
  };

  const handleEditItem = (item: ShoppingItemType) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleUpdateItem = (name: string, quantity: number) => {
    if (editingItem) {
      dispatch(editItem(editingItem.id, { name, quantity }));

      const updatedItems = items.map((item) =>
        item.id === editingItem.id ? { ...item, name, quantity } : item,
      );
      saveItems(updatedItems);

      setEditingItem(null);
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          dispatch(deleteItem(id));
          const updatedItems = items.filter((item) => item.id !== id);
          saveItems(updatedItems);
        },
      },
    ]);
  };

  const handleTogglePurchased = (id: string) => {
    dispatch(togglePurchased(id));
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item,
    );
    saveItems(updatedItems);
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
      />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
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
});
