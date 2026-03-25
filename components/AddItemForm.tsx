import { Button, Card, Input } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number) => void;
  onCancel: () => void;
  initialItem?: { name: string; quantity: number };
  submitText?: string;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  onAddItem,
  onCancel,
  initialItem,
  submitText = "Add Item",
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [name, setName] = useState(initialItem?.name || "");
  const [quantity, setQuantity] = useState(
    initialItem?.quantity?.toString() || "",
  );
  const [errors, setErrors] = useState<{ name?: string; quantity?: string }>(
    {},
  );

  const validateForm = (): boolean => {
    const newErrors: { name?: string; quantity?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Item name is required";
    }

    const quantityNum = parseInt(quantity, 10);
    if (isNaN(quantityNum) || quantityNum < 1) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const quantityNum = parseInt(quantity, 10);
      onAddItem(name.trim(), quantityNum);
      setName("");
      setQuantity("1");
      setErrors({});
    }
  };

  return (
    <Card style={styles.formContainer}>
      <Input
        label="Item Name"
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
        error={errors.name}
        accessibilityLabel="Item name input"
        accessibilityHint="Enter the name of the item you want to add to your shopping list"
      />

      <Input
        label="Quantity"
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        error={errors.quantity}
        accessibilityLabel="Quantity input"
        accessibilityHint="Enter the quantity of items you want to add"
      />

      <View style={styles.buttonContainer}>
        <Button
          title={submitText}
          onPress={handleSubmit}
          variant="primary"
          style={styles.submitButton}
        />
        <Button
          title="Cancel"
          onPress={onCancel}
          variant="outline"
          style={styles.cancelButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: Spacing.lg,
    margin: Spacing.md,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  submitButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
});
