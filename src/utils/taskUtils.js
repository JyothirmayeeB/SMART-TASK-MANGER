// Date formatting
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Priority sorting
  export const getPriorityWeight = (priority) => {
    const weights = {
      high: 3,
      medium: 2,
      low: 1
    };
    return weights[priority] || 0;
  };
  
  // Task filtering
  export const filterTasks = (tasks, filters) => {
    return tasks.filter(task => {
      const matchesSearch = task.text.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesCategory = filters.category === 'all' || task.category === filters.category;
      return matchesSearch && matchesPriority && matchesCategory;
    });
  };