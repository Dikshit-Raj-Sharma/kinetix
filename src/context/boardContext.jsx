import { createContext, useContext, useState, useEffect } from "react";
import initialData from "../data/initialData";
import { v4 } from "uuid";

const BoardContext = createContext(null);

export function BoardProvider({ children }) {
  const [state, setState] = useState(() => {
    const savedData = localStorage.getItem("kinetix-board");

    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    const jsonString = JSON.stringify(state);

    localStorage.setItem("kinetix-board", jsonString);
  }, [state]);

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
          [newTaskId]: newTask,
        },
        columns: {
          ...prev.columns,
          [columnId]: newColumn,
        },
      };
    });
  }

  function deleteTask(columnId, taskId) {
    setState((prev) => {
      const column = prev.columns[columnId];
      const newTaskIds = column.taskIds.filter((id) => id !== taskId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newTask = { ...prev.tasks };
      delete newTask[taskId];

      return {
        ...prev,
        tasks: newTask,
        columns: {
          ...prev.columns,
          [columnId]: newColumn,
        },
      };
    });
  }
  function editTask(taskId, newContent) {
    setState((prev) => {
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [taskId]: {
            ...prev.tasks[taskId],
            content: newContent,
          },
        },
      };
    });
  }
  function createNewColumn() {
    const id = v4();
    const newColumn = {
      id: id,
      title: "New Column",
      taskIds: [],
    };
    setState((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [id]: newColumn,
      },
      columnOrder: [...prev.columnOrder, id],
    }));
  }
  function deleteColumn(columnId) {
    setState((prev) => {
      const columnToDelete = prev.columns[columnId];
      if (!columnToDelete) return prev;

      const newTasks = { ...prev.tasks };
      columnToDelete.taskIds.forEach((taskId) => {
        delete newTasks[taskId];
      });

      const newColumns = { ...prev.columns };
      delete newColumns[columnId];

      const newColumnOrder = prev.columnOrder.filter((id) => id !== columnId);
      return {
        ...prev,
        columns: newColumns,
        columnOrder: newColumnOrder,
        tasks: newTasks,
      };
    });
  }

  function updateColumnTitle(columnId, newTitle) {
    setState((prev) => {
      const column = prev.columns[columnId];
      if (column.title === newTitle) return prev;

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [columnId]: { ...column, title: newTitle },
        },
      };
    });
  }
  const value = {
    state,
    setState,
    addTask,
    deleteTask,
    editTask,
    createNewColumn,
    deleteColumn,
    updateColumnTitle,
    
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
