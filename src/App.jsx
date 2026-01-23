import Task from "./components/Task.jsx";
import Column from "./components/Columns.jsx";
import { useBoard } from "./context/boardContext";
import { DndContext, closestCorners, DragOverlay, useDroppable } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import  {useState} from 'react';

export default function App() {
  const { state, setState } = useBoard();
  const [activeId,setActiveId]=useState(null);

  const handleDragStart = (event) =>{
    setActiveId(event.active.id);
  }

  const onDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    console.log("DRAG END:", active.id, "over", over?.id);
    if (!over) return;
    if (active.id === over.id) return;

    const srcColId = Object.keys(state.columns).find((key) =>
      state.columns[key].taskIds.includes(active.id),
    );
    // CHECK A: Did we drop on a Task?
    let dstColId = Object.keys(state.columns).find((key) =>
      state.columns[key].taskIds.includes(over.id)
    );
    
    // CHECK B: Did we drop on a Column directly?
    if (!dstColId && state.columns[over.id]) {
      dstColId = over.id;
    }

    if (!srcColId || !dstColId) return;

    const srcColumn = state.columns[srcColId];
    const dstColumn = state.columns[dstColId];
    const oldIndex = srcColumn.taskIds.indexOf(active.id);
    let newIndex;
    if (state.columns[over.id]) {
        // If dropping on a column, put it at the end
        newIndex = dstColumn.taskIds.length;
    } else {
        // If dropping on a task, put it above that task
        newIndex = dstColumn.taskIds.indexOf(over.id);
    }

    if (srcColId === dstColId) {
      // SCENARIO A: Reordering inside the SAME column
      const newTaskIds = arrayMove(srcColumn.taskIds, oldIndex, newIndex);
      setState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [srcColId]: {
            ...srcColumn,
            taskIds: newTaskIds,
          },
        },
      }));
    } else {
      // SCENARIO B: Moving to a DIFFERENT column
      const newSrcTaskIds = [...srcColumn.taskIds];
      const newDstTaskIds = [...dstColumn.taskIds];

      newSrcTaskIds.splice(oldIndex, 1);
      newDstTaskIds.splice(newIndex, 0, active.id);

      setState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [srcColId]: { ...srcColumn, taskIds: newSrcTaskIds },
          [dstColId]: { ...dstColumn, taskIds: newDstTaskIds },
        },
      }));
    }
  };

  return (
<main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 p-8">
      <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-4 items-start">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            return <Column key={column.id} column={column} />;
          })}
        </div>
        <DragOverlay>
          {activeId ? (
<div className=" text-white bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-grabbing transition-transform duration-150 hover:shadow-xl">
               {state.tasks[activeId].content}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}
