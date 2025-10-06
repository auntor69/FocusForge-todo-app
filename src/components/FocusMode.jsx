import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FocusMode({
  isOpen,
  onClose,
  quote,
  currentTask,
  workDuration,
  breakDuration,
  accentColor
}) {
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [ambientSound, setAmbientSound] = useState('silence');
  const [distractionShield, setDistractionShield] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const intervalRef = useRef(null);
  const holdIntervalRef = useRef(null);

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

  const handleToggle = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration);
  };

  const handleExitStart = () => {
    if (!distractionShield) {
      onClose();
      return;
    }

    holdIntervalRef.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current);
          onClose();
          return 100;
        }
        return prev + (100 / 30);
      });
    }, 100);
  };

  const handleExitEnd = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      setHoldProgress(0);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = isBreak
    ? ((breakDuration - timeLeft) / breakDuration) * 100
    : ((workDuration - timeLeft) / workDuration) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8"
      >
        {distractionShield && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
        )}

        <div className="relative z-20 max-w-2xl w-full text-center space-y-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">
              {isBreak ? 'Break Time' : 'Focus Session'}
            </p>
            <h1 className="text-6xl font-bold text-white tabular-nums mb-8">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </h1>

            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-8">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accentColor, width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {currentTask && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <p className="text-gray-400 text-sm mb-2">Current Task</p>
              <p className="text-white text-xl font-medium">{currentTask.text}</p>
            </motion.div>
          )}

          <motion.blockquote
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg italic"
          >
            "{quote.text}"
          </motion.blockquote>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={handleToggle}
              className="p-4 rounded-xl text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: accentColor }}
              aria-label={isRunning ? 'Pause' : 'Start'}
            >
              {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
            <button
              onClick={handleReset}
              className="p-4 rounded-xl bg-white/10 text-white transition-all hover:scale-105 active:scale-95 hover:bg-white/20"
              aria-label="Reset"
            >
              <RotateCcw className="w-8 h-8" />
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-6 text-sm"
          >
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300">
              <input
                type="checkbox"
                checked={distractionShield}
                onChange={(e) => setDistractionShield(e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ accentColor }}
              />
              <span>Distraction Shield</span>
            </label>

            <select
              value={ambientSound}
              onChange={(e) => setAmbientSound(e.target.value)}
              className="px-3 py-1 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/40"
            >
              <option value="silence">Silence</option>
              <option value="nature">Nature</option>
              <option value="rain">Rain</option>
            </select>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onMouseDown={handleExitStart}
            onMouseUp={handleExitEnd}
            onMouseLeave={handleExitEnd}
            onTouchStart={handleExitStart}
            onTouchEnd={handleExitEnd}
            className="relative px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2 mx-auto overflow-hidden"
            aria-label="Exit focus mode"
          >
            {distractionShield && holdProgress > 0 && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                style={{ width: `${holdProgress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${holdProgress}%` }}
              />
            )}
            <X className="w-5 h-5 relative z-10" />
            <span className="relative z-10">
              {distractionShield ? 'Hold to Exit' : 'Exit Focus Mode'}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
