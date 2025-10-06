import { motion } from 'framer-motion';
import { calculateProgress } from '../utils/taskUtils';

export function ProgressRing({ tasks, accentColor }) {
  const { completedWeighted, totalWeighted, percentage } = calculateProgress(tasks);

  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={accentColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={percentage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold"
            style={{ color: accentColor }}
          >
            {percentage}%
          </motion.span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {completedWeighted}/{totalWeighted} points
          </span>
        </div>
      </div>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-300 font-medium">
        Daily Progress
      </p>
    </div>
  );
}
