import { useState, useEffect, useCallback } from 'react';
import { loadData, saveData, getTodayString, getRandomQuote } from '../utils/storage';
import { calculateProgress } from '../utils/taskUtils';
import { v4 as uuidv4 } from 'uuid';

export function useAppData() {
  const [data, setData] = useState(() => loadData());
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const checkMidnightReset = useCallback(() => {
    const today = getTodayString();
    if (data.lastResetDate !== today) {
      const progress = calculateProgress(data.tasks);

      const newHistory = [
        ...data.history,
        {
          date: data.lastResetDate,
          completedWeighted: progress.completedWeighted,
          totalWeighted: progress.totalWeighted
        }
      ].slice(-30);

      const resetTasks = data.tasks.map(task => ({
        ...task,
        done: task.repeatDaily ? false : task.done
      }));

      setData(prev => ({
        ...prev,
        tasks: resetTasks,
        history: newHistory,
        lastResetDate: today,
        quoteOfDay: getRandomQuote()
      }));
    }
  }, [data]);

  useEffect(() => {
    checkMidnightReset();
    const interval = setInterval(checkMidnightReset, 60000);
    return () => clearInterval(interval);
  }, [checkMidnightReset]);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: uuidv4(),
      text: taskData.text,
      priority: taskData.priority || 'medium',
      priorityWeight: taskData.priority === 'high' ? 3 : taskData.priority === 'low' ? 1 : 2,
      repeatDaily: taskData.repeatDaily || false,
      tags: taskData.tags || [],
      notes: taskData.notes || '',
      done: false,
      createdAt: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, ...updates };
          if (updates.priority) {
            updatedTask.priorityWeight = updates.priority === 'high' ? 3 : updates.priority === 'low' ? 1 : 2;
          }
          return updatedTask;
        }
        return task;
      })
    }));
  }, []);

  const deleteTask = useCallback((taskId) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId)
    }));
  }, []);

  const toggleTask = useCallback((taskId) => {
    const task = data.tasks.find(t => t.id === taskId);
    const willBeCompleted = task && !task.done;

    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    }));

    if (willBeCompleted && data.settings.soundsOn) {
      playCompletionSound();
    }
  }, [data.tasks, data.settings.soundsOn]);

  const updateSettings = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }));
  }, []);

  const updateMood = useCallback((newMood) => {
    setData(prev => ({
      ...prev,
      mood: { value: newMood, savedAt: getTodayString() }
    }));
  }, []);

  const updateUI = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      ui: { ...prev.ui, ...updates }
    }));
  }, []);

  const resetAllData = useCallback(() => {
    const { defaultData } = require('../utils/storage');
    setData(defaultData);
  }, []);

  return {
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
  };
}

function playCompletionSound() {
  try {
    const audio = new Audio('/assets/ding.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch (error) {
    console.log('Sound playback failed');
  }
}
