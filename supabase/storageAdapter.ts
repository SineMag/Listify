// Cross-platform storage adapter that works on both native and web
// Tries AsyncStorage first (native), falls back to memory store if not available

import AsyncStorage from "@react-native-async-storage/async-storage";

// In-memory fallback storage for web and development environments
const memoryStorage = new Map<string, string>();

// Storage adapter interface
interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Check if AsyncStorage is available
let asyncStorageAvailable = false;
let storageAdapter: StorageAdapter;

// Test if AsyncStorage native module is available
const initializeStorage = async () => {
  try {
    await AsyncStorage.getItem("__test__");
    asyncStorageAvailable = true;
    console.log("AsyncStorage initialized");
  } catch (error) {
    asyncStorageAvailable = false;
    console.log("AsyncStorage not available, using memory fallback");
  }
};

// Create the storage adapter
const createStorageAdapter = (): StorageAdapter => {
  return {
    async getItem(key: string): Promise<string | null> {
      try {
        if (asyncStorageAvailable) {
          try {
            return await AsyncStorage.getItem(key);
          } catch (error) {
            // Fall back to memory if AsyncStorage fails
            console.warn("AsyncStorage getItem failed, using memory fallback");
            return memoryStorage.get(key) ?? null;
          }
        } else {
          return memoryStorage.get(key) ?? null;
        }
      } catch (error) {
        console.error("Storage getItem error:", error);
        return null;
      }
    },

    async setItem(key: string, value: string): Promise<void> {
      try {
        // Always store in memory as fallback
        memoryStorage.set(key, value);

        // Try to store in AsyncStorage if available
        if (asyncStorageAvailable) {
          try {
            await AsyncStorage.setItem(key, value);
          } catch (error) {
            console.warn(
              "AsyncStorage setItem failed, data stored in memory only",
            );
          }
        }
      } catch (error) {
        console.error("Storage setItem error:", error);
      }
    },

    async removeItem(key: string): Promise<void> {
      try {
        memoryStorage.delete(key);

        if (asyncStorageAvailable) {
          try {
            await AsyncStorage.removeItem(key);
          } catch (error) {
            console.warn("AsyncStorage removeItem failed");
          }
        }
      } catch (error) {
        console.error("Storage removeItem error:", error);
      }
    },
  };
};

// Initialize storage adapter
storageAdapter = createStorageAdapter();
initializeStorage();

export { StorageAdapter, storageAdapter };
