import { Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header({ mood, moodThemes, onMoodChange, onSettingsOpen, accentColor }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8" style={{ color: accentColor }} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            FocusForge
          </h1>
        </div>
        <button
          onClick={onSettingsOpen}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Open settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
        Forge your focus. Calm your chaos.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How are you feeling today?
        </label>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(moodThemes).map(([moodName, moodData]) => (
            <button
              key={moodName}
              onClick={() => onMoodChange(moodName)}
              className={`px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                mood === moodName
                  ? 'ring-2 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              style={
                mood === moodName
                  ? {
                      backgroundColor: moodData.accent,
                      color: 'white',
                      ringColor: moodData.accent
                    }
                  : undefined
              }
              aria-label={`Set mood to ${moodName}`}
            >
              <span className="mr-2">{moodData.emoji}</span>
              {moodName}
            </button>
          ))}
        </div>
        {mood && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 dark:text-gray-400 mt-2"
          >
            Mood saved for today
          </motion.p>
        )}
      </div>
    </motion.header>
  );
}
