import { useState } from "react";
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";

export const useDragHandler = (state, setState) => {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Mouse must move 5px to start dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    // Is it a Columns?
    const isColumn = active.data.current?.type === "Column";

    if (isColumn) {
      if (!over) return;
      if (active.id === over.id) return;
      const oldIndex = state.columnOrder.indexOf(active.id);
      const newIndex = state.columnOrder.indexOf(over.id);

      const newColumnOrder = arrayMove(state.columnOrder, oldIndex, newIndex);

      setState((prev) => ({
        ...prev,
        columnOrder: newColumnOrder,
      }));
      return;
    }

    if (!over) return;
    if (active.id === over.id) return;

    const srcColId = Object.keys(state.columns).find((key) =>
      state.columns[key].taskIds.includes(active.id),
    );
    // CHECK A: Did we drop on a Task?
    let dstColId = Object.keys(state.columns).find((key) =>
      state.columns[key].taskIds.includes(over.id),
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

  return { activeId, sensors, handleDragStart, onDragEnd };
};
