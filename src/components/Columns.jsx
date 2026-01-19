import Task from "./Task";
import { useBoard } from "../context/boardContext";

function Column({ column }) {
  const { state, addTask } = useBoard();

  return (
    <div className="w-80 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 shrink-0 shadow-md">
      <h2 className="font-bold text-lg mb-4 text-gray-700 dark:text-white">
        {column.title}
      </h2>
      <div className="flex flex-col gap-3">
        {column.taskIds.map((taskId) => {
          const task = state.tasks[taskId];
          return <Task key={task.id} task={task} columnId={column.id} />;
        })}
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
