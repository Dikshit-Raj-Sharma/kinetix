// need to make 3 objects
// tasks, columns, column order
const tasks = {
  "task-1":{id: "task-1",content: "..."},
  "task-2":{id: "task-2",content: "..."}
    
};

const columns = {
    "col-1":{id:'col-1',taskIds: ['task-1','task-2']},
    "col-2":{id:'col-2',taskIds: ['task-3','task-4']}
};

const columnOrder = ["col-1","col-2"];

const initialData = {
  tasks,
  columns,
  columnOrder
};

export default initialData;

