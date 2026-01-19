import Task from "./Task";
import { useBoard } from "../context/boardContext";

function Column({ column }) {
  const { state } = useBoard();

  return (
    <div className="w-80 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 shrink-0 shadow-md">
      <h2 className="font-bold text-lg mb-4 text-gray-700 dark:text-white">
        {column.title}
      </h2>

      <div className="flex flex-col gap-3">
        {column.taskIds.map((taskId) => {
          const task = state.tasks[taskId];
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}

export default Column;
