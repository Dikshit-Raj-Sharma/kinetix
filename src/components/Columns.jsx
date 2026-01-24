import Task from "./Task";
import { useBoard } from "../context/boardContext";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";

function Column({ column }) {
  const { state, addTask, deleteColumn } = useBoard();

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
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-80 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 shrink-0 shadow-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="w-80 shrink-0 group flex items-center justify-between mb-4 cursor-grab active:cursor-grabbing 
             rounded-md px-2 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-base text-gray-700 dark:text-white truncate">
            {column.title}
          </h2>

          <span
            className="text-xs px-2 py-0.5 rounded-full bg-gray-300 text-gray-700 
                   dark:bg-gray-700 dark:text-gray-200"
          >
            {column.taskIds.length}
          </span>
        </div>
        <button
          onClick={() => {
            const ok = window.confirm("Delete this column and all its tasks?");
            if (ok) deleteColumn(column.id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="relative inline-flex items-center justify-center rounded-md p-2
               text-gray-500 hover:text-red-500 
               hover:bg-red-500/10 dark:hover:bg-red-500/20
               opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3 grow min-h-[100px]">
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
        className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-md border-2 border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-white hover:bg-gray-700 transition-all"
      >
        <span className="text-xl font-bold">+</span> Add Task
      </button>
    </div>
  );
}

export default Column;
