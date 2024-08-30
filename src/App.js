// src/App.js
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskColumn from './components/TaskColumn';
import './App.css';

// const initialTasks = {
//   pending: [
//     { id: '1', content: 'Task 1' },
//     { id: '2', content: 'Task 2' },
//   ],
//   inProgress: [
//     { id: '3', content: 'Task 3' },
//   ],
//   completed: [
//     { id: '4', content: 'Task 4' },
//   ],
// };

function App() {
  // const [tasks, setTasks] = useState(initialTasks);
  const [tasks, setTasks] = useState({ pending: [], inProgress: [], completed: [] });

  useEffect(() => {
    // Fetch the tasks from the JSON file
    fetch('/tasks.json')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const moveTask = (taskId, fromColumnId, toColumnId) => {
    if (fromColumnId === toColumnId) return;

    const fromTasks = tasks[fromColumnId];
    const toTasks = tasks[toColumnId];

    const task = fromTasks.find(task => task.id === taskId);
    const updatedFromTasks = fromTasks.filter(task => task.id !== taskId);
    const updatedToTasks = [...toTasks, task];

    setTasks({
      ...tasks,
      [fromColumnId]: updatedFromTasks,
      [toColumnId]: updatedToTasks,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Drag-and-Drop Todo List</h1>
        <div className="task-container">
          {Object.keys(tasks).map(columnId => (
            <TaskColumn
              key={columnId}
              columnId={columnId}
              tasks={tasks[columnId]}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
