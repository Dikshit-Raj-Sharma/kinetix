
import Task from "./components/Task.jsx";
import Column from "./components/Columns.jsx";
import { useBoard } from "./context/boardContext";
export default function App() {
  const { state } = useBoard();
  return (
    <main className="flex h-screen p-4">
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        return <Column key={column.id} column={column} />;
      })}
    </main>
  );
}