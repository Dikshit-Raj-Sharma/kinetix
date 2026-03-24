import Task from "./Task";
import { useBoard } from "../context/boardContext";
import { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Pencil, Check, X } from "lucide-react";

function Column({ column }) {
  const { state, addTask, deleteColumn, updateColumnTitle } = useBoard();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  //Visual Helper for when column is being dragged.
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-80 bg-gray-200 dark:bg-gray-800 opacity-40 border-2 border-blue-500 rounded-lg h-[500px] shrink-0"
      ></div>
    );
  }
 const saveTitle = () => {
    setIsEditing(false);
    if (title.trim() === "") {
      setTitle(column.title);
      return;
    }
    updateColumnTitle(column.id, title);
  };

  const cancelTitle = () => {
    setIsEditing(false);
    setTitle(column.title);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-80 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 shrink-0 shadow-md flex flex-col max-h-[calc(100vh-250px)] snap-center"
    >
      <div
        {...attributes}
        {...listeners}
        className="shrink-0 group flex items-center justify-between mb-4 cursor-grab active:cursor-grabbing 
             rounded-md px-2 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        {isEditing ? (
          <div className="flex flex-col w-full gap-2 cursor-auto">
            <input
              autoFocus
              className="bg-white dark:bg-gray-900 border border-blue-500 rounded px-1 text-lg font-bold text-gray-700 dark:text-white focus:outline-none w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") {
                  e.stopPropagation();
                  saveTitle();
                }
                if (e.key === "Escape") {
                  e.stopPropagation();
                  cancelTitle();
                }
              }}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <div className="flex gap-2">
              <button
                onClick={saveTitle}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex items-center justify-center flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 rounded shadow-sm"
              >
                <Check size={14} className="mr-1" /> Save
              </button>
              <button
                onClick={cancelTitle}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex items-center justify-center flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 text-gray-800 dark:text-white text-xs py-1 rounded shadow-sm"
              >
                <X size={14} className="mr-1" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-hidden">
            <h2 className="font-bold text-lg text-gray-700 dark:text-white truncate">
              {column.title}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              {column.taskIds.length}
            </span>
          </div>
        )}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* 2. THE EDIT BUTTON */}
            <button
              onClick={() => setIsEditing(true)}
              onPointerDown={(e) => e.stopPropagation()} // Stop Drag
              className="p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-500/10 rounded"
            >
              <Pencil size={16} />
            </button>

            {/* THE DELETE BUTTON */}
            <button
              onClick={() => {
                const ok = window.confirm("Delete this column?");
                if (ok) deleteColumn(column.id);
              }}
              onPointerDown={(e) => e.stopPropagation()} // Stop Drag
              className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-0 pr-2">
        <SortableContext
          items={column.taskIds}
          strategy={verticalListSortingStrategy}
        >
          {column.taskIds.map((taskId) => {
            const task = state.tasks[taskId];
            return <Task key={task.id} task={task} columnId={column.id} />;
          })}
        </SortableContext>
      </div>
      <button
        onClick={() => addTask(column.id)}
        className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-md border-2 border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-white hover:bg-gray-700 transition-all shrink-0"
      >
        <span className="text-xl font-bold">+</span> Add Task
      </button>
    </div>
  );
}

export default Column;
