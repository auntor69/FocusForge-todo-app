import { useEffect } from 'react';

export function useKeyboardShortcuts({
  onFocusInput,
  onToggleFocusMode,
  onMoveSelection,
  onToggleSelected,
  tasks,
  selectedTaskId,
  setSelectedTaskId,
  toggleTask
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.key === 'Enter' && e.target.id === 'task-input') {
          return;
        }
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'n':
          e.preventDefault();
          onFocusInput();
          break;

        case 'f':
          e.preventDefault();
          onToggleFocusMode();
          break;

        case 'j': {
          e.preventDefault();
          const currentIndex = tasks.findIndex(t => t.id === selectedTaskId);
          if (currentIndex < tasks.length - 1) {
            setSelectedTaskId(tasks[currentIndex + 1].id);
          } else if (tasks.length > 0) {
            setSelectedTaskId(tasks[0].id);
          }
          break;
        }

        case 'k': {
          e.preventDefault();
          const currentIndex = tasks.findIndex(t => t.id === selectedTaskId);
          if (currentIndex > 0) {
            setSelectedTaskId(tasks[currentIndex - 1].id);
          } else if (tasks.length > 0) {
            setSelectedTaskId(tasks[tasks.length - 1].id);
          }
          break;
        }

        case ' ':
          if (selectedTaskId) {
            e.preventDefault();
            toggleTask(selectedTaskId);
          }
          break;

        case 'd':
          if (e.ctrlKey && selectedTaskId) {
            e.preventDefault();
            toggleTask(selectedTaskId);
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    onFocusInput,
    onToggleFocusMode,
    tasks,
    selectedTaskId,
    setSelectedTaskId,
    toggleTask
  ]);
}
