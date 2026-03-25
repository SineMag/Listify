import Head from "expo-router/head";
import { Platform } from "react-native";

import { store } from "@/redux/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { AppSettingsProvider } from "@/contexts/AppSettingsContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>Listify - Smart Shopping List</title>
        <meta name="description" content="A smart shopping list app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {Platform.OS === "web" && (
          <>
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            
          </>
        )}
      </Head>
      <AppSettingsProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AppSettingsProvider>
    </Provider>
  );
}
