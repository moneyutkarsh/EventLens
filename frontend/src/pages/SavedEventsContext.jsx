import React, { createContext, useContext, useEffect, useState } from "react";

const STORE_KEY = "savedEvents";

// Create context
const SavedEventsContext = createContext(null);

// Context Provider
export function SavedEventsProvider({ children }) {
  // Load from localStorage
  const [saved, setSaved] = useState(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(saved));
    } catch {}
  }, [saved]);

  return (
    <SavedEventsContext.Provider value={{ saved, setSaved }}>
      {children}
    </SavedEventsContext.Provider>
  );
}

// Custom hook for easier usage
export function useSavedEvents() {
  return useContext(SavedEventsContext);
}

