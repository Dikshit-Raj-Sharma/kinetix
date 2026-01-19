import React from 'react'

function Task({ task }) {
  return (
    <div className="bg-gray-100 p-2 mb-2 rounded shadow-sm">
      {task.content}
    </div>
  );
}

export default Task;

