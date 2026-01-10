import { createContext, useContext, useState } from "react";
import initialData from "../data/initialData";

const BoardContext = createContext(null);
export function BoardProvider({ children }) {
  const [state, setState] = useState(initialData);

  const value = {
    state,
    setState,
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used inside a BoardProvider");
  }

  return context;
}