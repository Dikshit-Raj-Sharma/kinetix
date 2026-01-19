import React from 'react'
import { Trash2 } from "lucide-react";
import { useBoard } from "../context/boardContext";

function Task({ task, columnId }) {
  const {deleteTask} =useBoard();
  return (
    <div className="group relative bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-600">
      
      <p className="text-gray-700 dark:text-gray-200 pr-6">
        {task.content}
      </p>

      {/* The Delete Button */}
      <button
        onClick={() => deleteTask(columnId, task.id)}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete Task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default Task;

