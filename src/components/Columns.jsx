import Task from "./Task";
import { useBoard } from "../context/boardContext";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Column({ column }) {
  const { state, addTask } = useBoard();

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
        className="cursor-grab active:cursor-grabbing"
      >
        <h2 className="font-bold text-lg mb-4 text-gray-700 dark:text-white">
          {column.title}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
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
      </button>{" "}
    </div>
  );
}

export default Column;
