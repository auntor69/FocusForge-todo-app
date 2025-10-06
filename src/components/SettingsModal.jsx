import { useState, useRef } from 'react';
import { X, Moon, Sun, Download, Upload, Trash2, Volume2, VolumeX, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportData, importData } from '../utils/storage';

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetData,
  theme,
  onToggleTheme,
  accent,
  onSetAccent,
  data,
  setData,
  accentColor
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetInput, setResetInput] = useState('');
  const [workMinutes, setWorkMinutes] = useState(Math.floor(settings.pomodoro.work / 60));
  const [breakMinutes, setBreakMinutes] = useState(Math.floor(settings.pomodoro.break / 60));
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSavePomodoro = () => {
    onUpdateSettings({
      pomodoro: {
        work: workMinutes * 60,
        break: breakMinutes * 60
      }
    });
  };

  const handleExport = () => {
    exportData(data);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imported = await importData(file);
      setData(imported);
      alert('Data imported successfully!');
      onClose();
    } catch (error) {
      alert('Failed to import data. Please check the file format.');
    }
  };

  const handleResetConfirm = () => {
    if (resetInput.toUpperCase() === 'RESET') {
      onResetData();
      setShowResetConfirm(false);
      setResetInput('');
      onClose();
    }
  };

  const accentOptions = [
    { name: 'blue', color: '#60A5FA', label: 'Blue' },
    { name: 'purple', color: '#C084FC', label: 'Purple' },
    { name: 'green', color: '#34D399', label: 'Green' },
    { name: 'orange', color: '#FB923C', label: 'Orange' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Close settings"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5" />
                Appearance
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                  <button
                    onClick={onToggleTheme}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <span className="text-gray-800 dark:text-white">
                      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accent Color
                  </label>
                  <div className="flex gap-3">
                    {accentOptions.map(option => (
                      <button
                        key={option.name}
                        onClick={() => onSetAccent(option.name)}
                        className={`w-12 h-12 rounded-xl transition-all hover:scale-110 ${
                          accent === option.name ? 'ring-4 ring-offset-2 dark:ring-offset-gray-800' : ''
                        }`}
                        style={{
                          backgroundColor: option.color,
                          ringColor: option.color
                        }}
                        aria-label={`Set accent to ${option.label}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pomodoro Timer
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Work Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={workMinutes}
                    onChange={(e) => setWorkMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:border-current"
                    style={{ borderColor: accentColor }}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:border-current"
                    style={{ borderColor: accentColor }}
                    min="1"
                  />
                </div>
                <button
                  onClick={handleSavePomodoro}
                  className="px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: accentColor }}
                >
                  Save Timer Settings
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                {settings.soundsOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                Sounds
              </h3>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundsOn}
                  onChange={(e) => onUpdateSettings({ soundsOn: e.target.checked })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor }}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Play sound on task completion
                </span>
              </label>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Data Management
              </h3>

              <div className="space-y-3">
                <button
                  onClick={handleExport}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Export Data
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Import Data
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />

                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    Reset All Data
                  </button>
                ) : (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg space-y-3">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      Type "RESET" to confirm deletion of all data:
                    </p>
                    <input
                      type="text"
                      value={resetInput}
                      onChange={(e) => setResetInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-red-300 dark:border-red-700 dark:bg-gray-900 dark:text-white focus:outline-none"
                      placeholder="Type RESET"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleResetConfirm}
                        disabled={resetInput.toUpperCase() !== 'RESET'}
                        className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Confirm Reset
                      </button>
                      <button
                        onClick={() => {
                          setShowResetConfirm(false);
                          setResetInput('');
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
