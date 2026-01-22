import { Button, Card } from "@/components/ui";
import { Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ShoppingItem as ShoppingItemType } from "@/types/shopping";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShoppingItemProps {
  item: ShoppingItemType;
  onTogglePurchased: (id: string) => void;
  onEdit: (item: ShoppingItemType) => void;
  onDelete: (id: string) => void;
}

export const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  onTogglePurchased,
  onEdit,
  onDelete,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getItemStyle = () => ({
    backgroundColor: item.purchased ? colors.purchased : colors.card,
    opacity: item.purchased ? 0.7 : 1,
  });

  const getTextStyle = () => ({
    textDecorationLine: item.purchased
      ? ("line-through" as const)
      : ("none" as const),
    color: item.purchased ? colors.textSecondary : colors.text,
  });

  return (
    <Card style={[styles.itemContainer, getItemStyle()]}>
      <View style={styles.itemContent}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => onTogglePurchased(item.id)}
        >
          <View
            style={[styles.checkbox, item.purchased && styles.checkboxChecked]}
          >
            {item.purchased && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, getTextStyle()]}>{item.name}</Text>
          <Text style={[styles.itemQuantity, getTextStyle()]}>
            Quantity: {item.quantity}
          </Text>
        </View>

        <View style={styles.itemActions}>
          <Button
            title="Edit"
            onPress={() => onEdit(item)}
            variant="outline"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Delete"
            onPress={() => onDelete(item.id)}
            variant="outline"
            size="small"
            style={styles.actionButton}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: Spacing.sm,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkboxContainer: {
    marginRight: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#72ddf7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#72ddf7",
  },
  checkmark: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  itemQuantity: {
    fontSize: Typography.caption.fontSize,
  },
  itemActions: {
    flexDirection: "column",
    gap: Spacing.sm,
  },
  actionButton: {
    minWidth: 60,
  },
});
