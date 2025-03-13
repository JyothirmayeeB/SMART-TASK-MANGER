import React from 'react';
import { PlusCircle } from 'lucide-react';
import { PRIORITIES, CATEGORIES } from '../constants/taskConstants';

const TaskForm = ({ 
  newTask, 
  setNewTask, 
  dueDate, 
  setDueDate, 
  priority, 
  setPriority,
  category, 
  setCategory,
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Rest of the form */}
    </form>
  );
};

export default TaskForm;