// Cross-platform storage adapter
// Uses localStorage on web, AsyncStorage on native

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Storage adapter interface
interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Web storage adapter using window.localStorage
const webStorageAdapter: StorageAdapter = {
  async getItem(key: string): Promise<string | null> {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error("localStorage getItem error:", error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error("localStorage setItem error:", error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("localStorage removeItem error:", error);
    }
  },
};

// Native storage adapter using AsyncStorage
const nativeStorageAdapter: StorageAdapter = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("AsyncStorage getItem error:", error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("AsyncStorage setItem error:", error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("AsyncStorage removeItem error:", error);
    }
  },
};

const storageAdapter: StorageAdapter =
  Platform.OS === "web" ? webStorageAdapter : nativeStorageAdapter;

export { StorageAdapter, storageAdapter };
