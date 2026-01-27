const tasks = {
};

const columns = {
  "col-1": { 
    id: "col-1", 
    title: "To Do", 
    taskIds: [] 
  },
  "col-2": { 
    id: "col-2", 
    title: "Done", 
    taskIds: [] 
  }
};

const columnOrder = ["col-1", "col-2"];

const initialData = {
  tasks,
  columns,
  columnOrder
};

export default initialData;