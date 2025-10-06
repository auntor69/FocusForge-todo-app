import { useState } from 'react';
import { Check, Trash2, CreditCard as Edit2, RotateCcw, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPriorityConfig } from '../utils/taskUtils';

export function TaskItem({ task, onToggle, onUpdate, onDelete, isSelected, accentColor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editRepeatDaily, setEditRepeatDaily] = useState(task.repeatDaily);

  const priorityConfig = getPriorityConfig(task.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, {
        text: editText.trim(),
        priority: editPriority,
        repeatDaily: editRepeatDaily
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditRepeatDaily(task.repeatDaily);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <motion.div
        layout
        className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow border-2 ${isSelected ? 'ring-2' : ''}`}
        style={{ borderColor: isSelected ? accentColor : undefined, ringColor: accentColor }}
      >
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full px-3 py-2 mb-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:border-current"
          style={{ borderColor: accentColor }}
          autoFocus
        />
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setEditPriority('low')}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              editPriority === 'low' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Low
          </button>
          <button
            onClick={() => setEditPriority('medium')}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              editPriority === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setEditPriority('high')}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              editPriority === 'high' ? 'bg-red-100 text-red-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            High
          </button>
        </div>
        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={editRepeatDaily}
            onChange={(e) => setEditRepeatDaily(e.target.checked)}
            className="w-4 h-4 rounded"
            style={{ accentColor }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">Repeat daily</span>
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded-lg text-white text-sm font-medium flex items-center gap-1"
            style={{ backgroundColor: accentColor }}
            aria-label="Save changes"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium flex items-center gap-1"
            aria-label="Cancel editing"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-all border-l-4 ${
        isSelected ? 'ring-2' : ''
      }`}
      style={{
        borderLeftColor: priorityConfig.color,
        ringColor: isSelected ? accentColor : undefined
      }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110 ${
            task.done
              ? 'border-green-500 bg-green-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-current'
          }`}
          style={{ borderColor: task.done ? '#10B981' : undefined }}
          aria-label={task.done ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.done && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-gray-800 dark:text-gray-200 ${task.done ? 'line-through opacity-60' : ''}`}>
            {task.text}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.bgClass} ${priorityConfig.textClass}`}>
              {priorityConfig.label}
            </span>
            {task.repeatDaily && (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" />
                Daily
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
