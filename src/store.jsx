import React, { createContext } from "react";
import { useGlobalReducer } from "./hooks/useGlobalReducer";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const { store, actions } = useGlobalReducer();

  return (
    <Context.Provider value={{ store, actions }}>
      {children}
    </Context.Provider>
  );
};