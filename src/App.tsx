import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useAppData } from './hooks/useAppData';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { sortTasks } from './utils/taskUtils';
import { defaultData } from './utils/storage';
import { Header } from './components/Header';
import { QuoteDisplay } from './components/QuoteDisplay';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { ProgressRing } from './components/ProgressRing';
import { PomodoroTimer } from './components/PomodoroTimer';
import { FocusMode } from './components/FocusMode';
import { HistoryPanel } from './components/HistoryPanel';
import { SettingsModal } from './components/SettingsModal';

function AppContent() {
  const {
    data,
    setData,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    updateSettings,
    updateMood,
    updateUI,
    resetAllData,
    selectedTaskId,
    setSelectedTaskId
  } = useAppData();

  const {
    theme,
    setTheme,
    toggleTheme,
    mood,
    setMood,
    moodTheme,
    accent,
    setAccent,
    accentColor,
    moodThemes
  } = useTheme();

  const [showSettings, setShowSettings] = useState(false);
  const taskInputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setTheme(data.settings.theme);
      setMood(data.mood.value);
      setAccent(data.settings.accent);
      isInitialMount.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      updateSettings({ theme, accent });
    }
  }, [theme, accent]);

  const handleMoodChange = (newMood: string) => {
    setMood(newMood);
    updateMood(newMood);
  };

  const handleFocusInput = () => {
    const input = document.getElementById('task-input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const handleToggleFocusMode = () => {
    updateUI({ showFocusMode: !data.ui.showFocusMode });
  };

  const sortedTasks = sortTasks(data.tasks);
  const currentTask = sortedTasks.find(t => !t.done);

  useKeyboardShortcuts({
    onFocusInput: handleFocusInput,
    onToggleFocusMode: handleToggleFocusMode,
    tasks: sortedTasks,
    selectedTaskId,
    setSelectedTaskId,
    toggleTask
  });

  useEffect(() => {
    if (sortedTasks.length > 0 && !selectedTaskId) {
      setSelectedTaskId(sortedTasks[0].id);
    }
  }, [sortedTasks.length]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 p-4 md:p-8 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : `bg-gradient-to-br ${moodTheme.gradient}`
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <Header
          mood={mood}
          moodThemes={moodThemes}
          onMoodChange={handleMoodChange}
          onSettingsOpen={() => setShowSettings(true)}
          accentColor={accentColor}
        />

        <QuoteDisplay quote={data.quoteOfDay} accentColor={accentColor} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <TaskInput onAdd={addTask} accentColor={accentColor} />
            <TaskList
              tasks={data.tasks}
              onToggle={toggleTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              selectedTaskId={selectedTaskId}
              accentColor={accentColor}
            />
          </div>

          <div className="space-y-6">
            <ProgressRing tasks={data.tasks} accentColor={accentColor} />
            <PomodoroTimer
              workDuration={data.settings.pomodoro.work}
              breakDuration={data.settings.pomodoro.break}
              onFocusModeToggle={handleToggleFocusMode}
              accentColor={accentColor}
            />
            <HistoryPanel history={data.history} accentColor={accentColor} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8"
        >
          <p className="mb-2">Keyboard shortcuts: N (new task) • J/K (navigate) • Space (toggle) • F (focus mode)</p>
        </motion.div>
      </div>

      <FocusMode
        isOpen={data.ui.showFocusMode}
        onClose={() => updateUI({ showFocusMode: false })}
        quote={data.quoteOfDay}
        currentTask={currentTask}
        workDuration={data.settings.pomodoro.work}
        breakDuration={data.settings.pomodoro.break}
        accentColor={accentColor}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={data.settings}
        onUpdateSettings={updateSettings}
        onResetData={resetAllData}
        theme={theme}
        onToggleTheme={toggleTheme}
        accent={accent}
        onSetAccent={setAccent}
        data={data}
        setData={setData}
        accentColor={accentColor}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider
      initialTheme={defaultData.settings.theme}
      initialMood={defaultData.mood.value}
      initialAccent={defaultData.settings.accent}
    >
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
