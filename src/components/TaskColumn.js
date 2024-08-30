// src/components/TaskColumn.js
import React from 'react';
import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';

const TaskColumn = ({ columnId, tasks, moveTask }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'TASK',
    drop: () => ({ columnId }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className={`task-column ${isOver ? 'over' : ''}`}>
      <h2>{columnId}</h2>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          columnId={columnId}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
