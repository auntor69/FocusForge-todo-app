export function calculateProgress(tasks) {
  let completedWeighted = 0;
  let totalWeighted = 0;

  tasks.forEach(task => {
    totalWeighted += task.priorityWeight;
    if (task.done) {
      completedWeighted += task.priorityWeight;
    }
  });

  if (totalWeighted === 0) {
    return { completedWeighted: 0, totalWeighted: 0, percentage: 0 };
  }

  const percentage = Math.round((completedWeighted / totalWeighted) * 100);
  return { completedWeighted, totalWeighted, percentage };
}

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.priorityWeight !== b.priorityWeight) return b.priorityWeight - a.priorityWeight;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

export function getPriorityConfig(priority) {
  const configs = {
    low: { label: 'Low', color: '#60A5FA', weight: 1, bgClass: 'bg-blue-100', textClass: 'text-blue-600', borderClass: 'border-blue-400' },
    medium: { label: 'Medium', color: '#F59E0B', weight: 2, bgClass: 'bg-orange-100', textClass: 'text-orange-600', borderClass: 'border-orange-400' },
    high: { label: 'High', color: '#EF4444', weight: 3, bgClass: 'bg-red-100', textClass: 'text-red-600', borderClass: 'border-red-400' }
  };
  return configs[priority] || configs.low;
}
