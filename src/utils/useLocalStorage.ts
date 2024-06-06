import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T | ((val: T) => T)) => void, boolean] => {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      } catch (error) {
        console.error("Error loading async storage value:", error);
      } finally {
        setIsReady(true);
      }
    };

    loadStoredValue();
  }, [key]);

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting async storage value:", error);
    }
  };

  return [storedValue, setValue, isReady];
};

export default useLocalStorage;
