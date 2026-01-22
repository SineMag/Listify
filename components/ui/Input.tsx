import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  value,
  onChangeText,
  style,
  inputStyle,
  ...textInputProps
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = (): ViewStyle => ({
    borderWidth: 2,
    borderColor: error
      ? colors.error
      : isFocused
        ? colors.primary
        : colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: colors.card,
    fontSize: Typography.body.fontSize,
    color: colors.text,
    minHeight: 44,
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: Typography.caption.fontSize,
    color: colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: "500",
  });

  const getErrorStyle = (): TextStyle => ({
    fontSize: Typography.small.fontSize,
    color: colors.error,
    marginTop: Spacing.xs,
  });

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      <TextInput
        style={[getInputStyle(), inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps}
      />
      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
});
