import Column from "./components/Columns.jsx";
import { useBoard } from "./context/boardContext";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { useDragHandler } from "./hooks/useDragHandler";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Kanban } from "lucide-react";
export default function App() {
  const { state, setState, createNewColumn } = useBoard();

  const { activeId, handleDragStart, onDragEnd } = useDragHandler(
    state,
    setState,
  );
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 }, // Desktop: Move 10px to start drag
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 }, // Mobile: Press & hold for 250ms
    }),
  );
  const collisionDetectionStrategy = (args) => {
    // 1. Who is the active item?
    const activeType = args.active.data.current?.type;

    // 2. If it's a Column, use 'pointerWithin' (Mouse Cursor)
    if (activeType === "Column") {
      return pointerWithin(args);
    }
    return closestCorners(args);
  };

  return (
    <div className="flex flex-col h-dvh bg-slate-50 dark:bg-[#090b11] bg-dots">
      <header className="shrink-0 py-6 px-4 md:px-8 flex items-center justify-center">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src="/kinetix-icon.png"
            alt="Kinetix Logo"
            className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-xl"
          />

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-[56px] font-black tracking-wide leading-none select-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 filter drop-shadow-sm">
                KINETIX
              </span>
            </h1>

            <span className="text-[10px] md:text-[16px] font-bold text-slate-500 dark:text-white tracking-[0.2em] uppercase mt-1">
              Work Flow Platform
            </span>
          </div>
        </div>
      </header>
      <main
        className={`flex-1 w-full p-4 md:p-8 overflow-x-auto overflow-y-hidden ${!activeId ? "snap-x snap-mandatory" : ""}`}
      >
        {" "}
        <DndContext
          collisionDetection={collisionDetectionStrategy}
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
            <button
              onClick={createNewColumn}
              className="h-[60px] w-80 shrink-0 rounded-xl bg-slate-200/50 dark:bg-slate-800/40 backdrop-blur-[2px] border border-slate-300/50 dark:border-slate-700/50 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all snap-center cursor-pointer shadow-sm"
            >
              <Plus size={24} />
              <span className="font-semibold">Add Column</span>
            </button>
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
      <button
        onClick={createNewColumn}
        className="
          md:hidden 
          fixed 
          bottom-6 
          right-6 
          w-14 
          h-14 
          rounded-full 
          bg-gradient-to-r from-blue-600 to-purple-600 
          text-white 
          shadow-xl 
          shadow-blue-900/20
          flex 
          items-center 
          justify-center 
          active:scale-95 
          transition-transform 
          z-50
        "
        aria-label="Add new column"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
