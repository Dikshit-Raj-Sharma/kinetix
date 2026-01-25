import { React, useState } from "react";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { useBoard } from "../context/boardContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, columnId }) {
  const { deleteTask, editTask } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.content);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const handleSave = () => {
    if (!text.trim()) return;
    editTask(task.id, text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(task.content);
    setIsEditing(false);
  };

  const baseClasses =
    "group relative bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-600";

  return (
    <>
      {isEditing ? (
        <div ref={setNodeRef} style={style} className={baseClasses}>
          <div className="flex flex-col gap-2">
            <input
              autoFocus
              className="w-full bg-gray-50 dark:bg-gray-800 border border-blue-500 rounded px-2 py-1 text-gray-700 dark:text-gray-200 focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  handleSave();
                }
                if (e.key === "Escape") {
                  e.stopPropagation();
                  handleCancel();
                }
              }}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 text-sm"
              >
                <Check size={14} /> Save
              </button>

              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-2 py-1 rounded bg-gray-300 dark:bg-gray-600 dark:text-white hover:bg-gray-400 text-sm"
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={`${baseClasses} `}
        >
          <p className="text-gray-700 dark:text-gray-200 pr-6">
            {task.content}
          </p>
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* The Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-blue-500"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Pencil size={16} />
            </button>

            {/* The Delete Button */}
            <button
              onClick={() => deleteTask(columnId, task.id)}
              className="p-1 text-gray-400 hover:text-red-500"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
