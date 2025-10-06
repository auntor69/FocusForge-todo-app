import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';
import { sortTasks } from '../utils/taskUtils';

export function TaskList({ tasks, onToggle, onUpdate, onDelete, selectedTaskId, accentColor }) {
  const [searchText, setSearchText] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchText.toLowerCase());
    const matchesTag = !filterTag || task.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const sortedTasks = sortTasks(filteredTasks);

  const allTags = [...new Set(tasks.flatMap(t => t.tags))];

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-500 dark:text-gray-400"
      >
        <p className="text-lg">No tasks yet. Add one above to get started!</p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-current transition-colors"
            style={{ borderColor: searchText ? accentColor : undefined }}
            aria-label="Search tasks"
          />
        </div>
        {allTags.length > 0 && (
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none"
            aria-label="Filter by tag"
          >
            <option value="">All tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isSelected={task.id === selectedTaskId}
              accentColor={accentColor}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500 dark:text-gray-400"
        >
          <p>No tasks match your search.</p>
        </motion.div>
      )}
    </div>
  );
}
