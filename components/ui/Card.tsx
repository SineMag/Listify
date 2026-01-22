import { BorderRadius, Colors, Shadow } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  shadow = true,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getCardStyle = (): ViewStyle => ({
    backgroundColor: colors.card,
    borderRadius: BorderRadius.lg,
    padding: 16,
    ...(shadow && Shadow.md),
  });

  return <View style={[styles.card, getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});
