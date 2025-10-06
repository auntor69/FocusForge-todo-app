import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';

export function HistoryPanel({ history, accentColor }) {
  const last7Days = history.slice(-7);

  if (last7Days.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" style={{ color: accentColor }} />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">History</h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Complete tasks to see your progress history here.
        </p>
      </motion.div>
    );
  }

  const maxWeight = Math.max(...last7Days.map(d => d.totalWeighted), 1);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5" style={{ color: accentColor }} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Last 7 Days</h2>
      </div>

      <div className="space-y-4">
        {last7Days.map((entry, index) => {
          const percentage = entry.totalWeighted > 0
            ? Math.round((entry.completedWeighted / entry.totalWeighted) * 100)
            : 0;
          const barHeight = (entry.totalWeighted / maxWeight) * 100;

          const date = new Date(entry.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = date.getDate();

          return (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">{dayName}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{dayNum}</p>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {entry.completedWeighted}/{entry.totalWeighted} pts
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: accentColor }}
                  >
                    {percentage}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
