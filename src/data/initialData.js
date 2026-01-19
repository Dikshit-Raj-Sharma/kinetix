const tasks = {
  "task-1": { id: "task-1", content: "Fix navigation bar bug" },
  "task-2": { id: "task-2", content: "Design project logo" },
  "task-3": { id: "task-3", content: "Research React Context API" },
  "task-4": { id: "task-4", content: "Optimize database queries" }
};

const columns = {
  "col-1": { 
    id: "col-1", 
    title: "To Do", 
    taskIds: ["task-1", "task-2"] 
  },
  "col-2": { 
    id: "col-2", 
    title: "Done", 
    taskIds: ["task-3", "task-4"] 
  }
};

const columnOrder = ["col-1", "col-2"];

const initialData = {
  tasks,
  columns,
  columnOrder
};

export default initialData;