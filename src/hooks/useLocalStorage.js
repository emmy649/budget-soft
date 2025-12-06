import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("LocalStorage parse error:", err);
      return initialValue;
    }
  });

  const updateValue = (val) => {
    const newValue = typeof val === "function" ? val(value) : val;
    setValue(newValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error("LocalStorage set error:", err);
    }
  };

  return [value, updateValue];
}
