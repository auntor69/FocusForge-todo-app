import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function PomodoroTimer({ workDuration, breakDuration, onFocusModeToggle, accentColor }) {
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            return isBreak ? workDuration : breakDuration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isBreak, workDuration, breakDuration]);

  useEffect(() => {
    setTimeLeft(isBreak ? breakDuration : workDuration);
  }, [workDuration, breakDuration]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = isBreak
    ? ((breakDuration - timeLeft) / breakDuration) * 100
    : ((workDuration - timeLeft) / workDuration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h2>
        <button
          onClick={onFocusModeToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Enter focus mode"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke={accentColor}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - progress / 100) }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-800 dark:text-white tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleToggle}
            className="p-3 rounded-xl text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: accentColor }}
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all hover:scale-105 active:scale-95"
            aria-label="Reset timer"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
