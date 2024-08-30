// src/components/TaskItem.js
import React from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task, index, moveTask, columnId }) => {
  const [, dragRef] = useDrag({
    type: 'TASK',
    item: { id: task.id, from: columnId },
    end: (item, monitor) => {
      const { id, from } = item;
      const dropResult = monitor.getDropResult();
      if (dropResult && from !== dropResult.columnId) {
        moveTask(id, from, dropResult.columnId);
      }
    },
  });

  return (
    <div ref={dragRef} className="task-item">
      {task.content}
    </div>
  );
};

export default TaskItem;
