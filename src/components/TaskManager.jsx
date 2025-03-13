import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, CheckCircle, Calendar, Search, Tag } from 'lucide-react';
import { useSpring, animated, useTransition, config } from '@react-spring/web';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showNotification, setShowNotification] = useState(false);

  // Animation for the notification
  const notificationAnimation = useSpring({
    opacity: showNotification ? 1 : 0,
    transform: showNotification ? 'translateY(0px)' : 'translateY(-20px)',
    config: { tension: 300, friction: 20 }
  });

  // Animation for tasks
  const taskTransitions = useTransition(
    tasks.filter(task => 
      task.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPriority === 'all' || task.priority === filterPriority) &&
      (filterCategory === 'all' || task.category === filterCategory)
    ),
    {
      from: { opacity: 0, transform: 'translateY(20px)' },
      enter: { opacity: 1, transform: 'translateY(0px)' },
      leave: { opacity: 0, transform: 'translateY(-20px)' },
      keys: task => task.id,
      config: config.gentle
    }
  );

  // Form animation
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 20 }
  });

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        dueDate,
        priority,
        category,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setDueDate('');
      showNotificationMessage('Task added successfully!');
    }
  };

  const showNotificationMessage = (message) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    showNotificationMessage('Task status updated!');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    showNotificationMessage('Task deleted!');
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <animated.div style={formAnimation} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6 hover:scale-105 transition-transform duration-300">
              Interactive Task Manager
            </h1>

            {/* Animated Notification */}
            {showNotification && (
              <animated.div 
                style={notificationAnimation}
                className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg"
              >
                {showNotification}
              </animated.div>
            )}

            {/* Add Task Form with hover effects */}
            <form onSubmit={addTask} className="space-y-4 mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Task
                </button>
              </div>
            </form>

            {/* Search and Filters with hover effects */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                />
              </div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
              >
                <option value="all">All Categories</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
              </select>
            </div>

            {/* Animated Tasks List */}
            <div className="space-y-3">
              {taskTransitions((style, task) => (
                <animated.div
                  style={style}
                  className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border-l-4 ${
                    task.completed ? 'border-green-500 bg-green-50' : `border-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-500`
                  } transition-all duration-300 hover:shadow-lg transform hover:scale-101`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`${
                        task.completed ? 'text-green-500' : 'text-gray-400'
                      } hover:text-green-600 transition-all duration-300 transform hover:scale-110`}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col">
                      <span
                        className={`${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-700'
                        } font-medium transition-all duration-300`}
                      >
                        {task.text}
                      </span>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(task.priority)} transition-colors duration-300`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110 ml-4"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </animated.div>
              ))}
              
              {tasks.length === 0 && (
                <animated.div 
                  style={formAnimation}
                  className="text-center py-8 text-gray-500"
                >
                  No tasks found. Add some tasks to get started!
                </animated.div>
              )}
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default TaskManager;