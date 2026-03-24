import { React, useState } from "react";
import { Trash2, Pencil, Check, X, ChevronsUpDown } from "lucide-react";
import { useBoard } from "../context/boardContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, columnId }) {
  const { deleteTask, editTask, cycleTaskPriority } = useBoard();
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
    "group relative bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow-md border border-white/50 dark:border-white/10 transition-all hover:-translate-y-0.5 hover:bg-white dark:hover:bg-slate-900/80";

  const priorityColors = {
    high: "bg-red-500 shadow-red-500/40",
    medium: "bg-amber-500 shadow-amber-500/40",
    low: "bg-emerald-500 shadow-emerald-500/40",
  };
  const currentPriority = task.priority || "low";
  return (
    <>
      {isEditing ? (
        <div ref={setNodeRef} style={style} className={baseClasses}>
          <div className="flex flex-col gap-2">
            <input
              autoFocus
              className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-blue-500/50 rounded px-2 py-1 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
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
          <div className="flex items-start">
            <button
              onClick={() => cycleTaskPriority(task.id)}
              onPointerDown={(e) => e.stopPropagation()} // Stop drag when clicking
              className="group/badge flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
              title="Click to change priority"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  task.priority === "high"
                    ? "bg-red-500 shadow-sm shadow-red-500/40"
                    : task.priority === "medium"
                      ? "bg-amber-500 shadow-sm shadow-amber-500/40"
                      : "bg-emerald-500 shadow-sm shadow-emerald-500/40"
                }`}
              ></div>
              <span>
                {task.priority === "high"
                  ? "High"
                  : task.priority === "medium"
                    ? "Med"
                    : "Low"}
              </span>
              <ChevronsUpDown size={12} className="text-slate-400 group-hover/badge:text-slate-600 dark:group-hover/badge:text-slate-200 transition-colors" />
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-200 pr-16 whitespace-pre-wrap break-words leading-relaxed text-sm">
            {task.content}
          </p>
          <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            {" "}
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
