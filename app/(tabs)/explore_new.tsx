import { Button, Card } from "@/components/ui";
import { Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { setError, setItems } from "@/redux/shoppingListActions";
import { RootState } from "@/redux/store";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ExploreScreen() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.shoppingList);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const purchasedCount = items.filter((item) => item.purchased).length;
  const totalCount = items.length;
  const completionRate =
    totalCount > 0 ? Math.round((purchasedCount / totalCount) * 100) : 0;

  const handleClearList = () => {
    Alert.alert(
      "Clear Shopping List",
      "Are you sure you want to clear all items from your shopping list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            try {
              localStorage.removeItem("shoppingList");
              dispatch(setItems([]));
            } catch (err) {
              dispatch(setError("Failed to clear shopping list"));
            }
          },
        },
      ],
    );
  };

  const handleClearPurchased = () => {
    Alert.alert(
      "Clear Purchased Items",
      "Are you sure you want to remove all purchased items?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear Purchased",
          style: "destructive",
          onPress: () => {
            try {
              const unpurchasedItems = items.filter((item) => !item.purchased);
              localStorage.setItem(
                "shoppingList",
                JSON.stringify(unpurchasedItems),
              );
              dispatch(setItems(unpurchasedItems));
            } catch (err) {
              dispatch(setError("Failed to clear purchased items"));
            }
          },
        },
      ],
    );
  };

  const exportList = () => {
    try {
      const listText = items
        .map(
          (item) =>
            `${item.purchased ? "✓" : "○"} ${item.name} (Quantity: ${item.quantity})`,
        )
        .join("\n");

      Alert.alert(
        "Export Shopping List",
        "Your shopping list has been prepared for export. You can copy this text and share it.",
        [
          {
            text: "Copy to Clipboard",
            onPress: () => {
              // In a real app, you would use Clipboard.setString(listText)
              Alert.alert("Copied!", "Shopping list copied to clipboard");
            },
          },
          { text: "OK", style: "cancel" },
        ],
      );
    } catch (err) {
      dispatch(setError("Failed to export shopping list"));
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Shopping List Stats
        </Text>
      </View>

      <Card style={styles.statsCard}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>
          List Overview
        </Text>
        <View style={styles.statsRow}>
          <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
            Total Items:
          </Text>
          <Text style={[styles.statsValue, { color: colors.text }]}>
            {totalCount}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
            Purchased:
          </Text>
          <Text style={[styles.statsValue, { color: colors.success }]}>
            {purchasedCount}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
            Remaining:
          </Text>
          <Text style={[styles.statsValue, { color: colors.text }]}>
            {totalCount - purchasedCount}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
            Completion:
          </Text>
          <Text style={[styles.statsValue, { color: colors.primary }]}>
            {completionRate}%
          </Text>
        </View>
      </Card>

      <Card style={styles.actionsCard}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>
          List Actions
        </Text>

        <Button
          title="Export List"
          onPress={exportList}
          variant="secondary"
          style={styles.actionButton}
        />

        <Button
          title="Clear Purchased Items"
          onPress={handleClearPurchased}
          variant="outline"
          style={styles.actionButton}
          disabled={purchasedCount === 0}
        />

        <Button
          title="Clear All Items"
          onPress={handleClearList}
          variant="outline"
          style={styles.actionButton}
          disabled={totalCount === 0}
        />
      </Card>

      <Card style={styles.aboutCard}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>
          About Listify
        </Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          Listify is your smart shopping list companion. Keep track of your
          grocery needs, mark items as purchased, and never forget anything at
          the store again.
        </Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          Features:
        </Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          • Add, edit, and delete items
        </Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          • Mark items as purchased
        </Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          • Persistent storage
        </Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          • Beautiful, intuitive interface
        </Text>
      </Card>
    </ScrollView>
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
  },
  statsCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
  },
  statsTitle: {
    fontSize: Typography.heading.fontSize,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statsLabel: {
    fontSize: Typography.body.fontSize,
  },
  statsValue: {
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
  },
  actionsCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
  },
  actionButton: {
    marginBottom: Spacing.md,
  },
  aboutCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  aboutText: {
    fontSize: Typography.body.fontSize,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
});
