import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function TaskInput({ onAdd, accentColor }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [repeatDaily, setRepeatDaily] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({ text: text.trim(), priority, repeatDaily });
      setText('');
      setPriority('medium');
      setRepeatDaily(false);
      setShowAdvanced(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:border-current transition-colors"
          style={{ borderColor: text ? accentColor : undefined }}
          aria-label="New task input"
          id="task-input"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-3 rounded-xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          style={{ backgroundColor: accentColor }}
          aria-label="Add task"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriority('low')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              priority === 'low'
                ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label="Set priority to low"
          >
            Low
          </button>
          <button
            type="button"
            onClick={() => setPriority('medium')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              priority === 'medium'
                ? 'bg-orange-100 text-orange-600 ring-2 ring-orange-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label="Set priority to medium"
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => setPriority('high')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              priority === 'high'
                ? 'bg-red-100 text-red-600 ring-2 ring-red-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label="Set priority to high"
          >
            High
          </button>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={repeatDaily}
            onChange={(e) => setRepeatDaily(e.target.checked)}
            className="w-4 h-4 rounded accent-current"
            style={{ accentColor }}
            aria-label="Repeat daily"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">Repeat daily</span>
        </label>
      </div>
    </motion.form>
  );
}
