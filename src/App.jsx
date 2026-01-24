import Column from "./components/Columns.jsx";
import { useBoard } from "./context/boardContext";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { useDragHandler } from "./hooks/useDragHandler";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function App() {
  const { state, setState } = useBoard();

  const { activeId, sensors, handleDragStart, onDragEnd } = useDragHandler(
    state,
    setState,
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 p-8">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="flex gap-4 items-start">
          <SortableContext
            items={state.columnOrder}
            strategy={horizontalListSortingStrategy}
          >
            {state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              return <Column key={column.id} column={column} />;
            })}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeId ? (
            // 1. Is it a Column?
            state.columns[activeId] ? (
              <div
                className="w-80 rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-2xl border border-slate-200 dark:border-slate-700 cursor-grabbing opacity-95 scale-105 transition-transform duration-150 ease-out
              +"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg text-slate-900 dark:text-white">
                    {state.columns[activeId].title}
                  </h2>

                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                    Dragging
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                  <div className="h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                </div>
              </div>
            ) : // 2. Is it a Task?
            state.tasks[activeId] ? (
              <div className="w-72 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-2xl border border-slate-200 dark:border-slate-700 cursor-grabbing opacity-95 scale-105 transition-transform duration-150 ease-out">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
                    {state.tasks[activeId].content}
                  </p>

                  <span className="shrink-0 px-2 py-1 text-[10px] rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                    Dragging
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            ) : null
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}
