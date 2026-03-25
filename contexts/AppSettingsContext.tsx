import { storageAdapter } from "@/supabase/storageAdapter";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  soundEnabled: boolean;
  hapticFeedback: boolean;
  autoBackup: boolean;
  fontSize: "small" | "medium" | "large";
  theme: "light" | "dark" | "system";
}

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  toggleDarkMode: () => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  darkMode: false,
  notifications: true,
  soundEnabled: true,
  hapticFeedback: true,
  autoBackup: true,
  fontSize: "medium",
  theme: "system",
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(
  undefined,
);

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error(
      "useAppSettings must be used within an AppSettingsProvider",
    );
  }
  return context;
};

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Load settings from storage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Save settings to storage whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const loadSettings = async () => {
    try {
      const savedSettings = await storageAdapter.getItem("appSettings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.log("Failed to load settings:", error);
    }
  };

  const saveSettings = async (settingsToSave: AppSettings) => {
    try {
      await storageAdapter.setItem(
        "appSettings",
        JSON.stringify(settingsToSave),
      );
    } catch (error) {
      console.log("Failed to save settings:", error);
    }
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const toggleDarkMode = () => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value: AppSettingsContextType = {
    settings,
    updateSettings,
    toggleDarkMode,
    resetSettings,
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsProvider;
