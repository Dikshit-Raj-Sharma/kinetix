import { createContext, useContext, useState } from "react";
import initialData from "../data/initialData";
import { v4 } from "uuid";

const BoardContext = createContext(null);

export function BoardProvider({ children }) {
  const [state, setState] = useState(initialData);

  function addTask(columnId) {
    const newTaskId = v4();
    const newTask = {
      id: newTaskId,
      content: "New task",
    };

    setState((prev) => {
      const column = prev.columns[columnId];

      const newColumn = {
        ...column,
        taskIds: [...column.taskIds, newTaskId],
      };

      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [newTaskId]: newTask
        },
        columns:{
          ...prev.columns,
          [columnId]:newColumn,
        },
      };
    });
  }

  const value = {
    state,
    setState,
    addTask,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used inside a BoardProvider");
  }

  return context;
}
