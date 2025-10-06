# FocusForge

**Forge your focus. Calm your chaos.**

FocusForge is a minimalist daily productivity hub built with React, TypeScript, and Tailwind CSS. It merges task management, mood tracking, and a Pomodoro timer into a calm, offline-first application designed for students and creators.

## Features

### Task Management
- **Priority Levels**: Low (1 point), Medium (2 points), High (3 points)
- **Weighted Progress**: Track completion based on task priority weights
- **Daily Repeating Tasks**: Tasks that automatically reset each day
- **Search & Filter**: Find tasks quickly by text or tags
- **Edit & Delete**: Full task management capabilities

### Mood-Based Themes
Choose from 5 moods that change the entire app theme:
- **Calm** - Soothing blue gradient
- **Motivated** - Energetic orange tones
- **Tired** - Comfortable dark grey
- **Focused** - Fresh green accent
- **Stressed** - Calming plum palette

### Pomodoro Timer
- Configurable work and break durations
- Visual progress ring
- Pause, resume, and reset controls
- Seamless integration with Focus Mode

### Focus Mode
- Fullscreen distraction-free environment
- Display current task and motivational quote
- Distraction Shield with hold-to-exit protection
- Ambient sound options (Nature, Rain, Silence)
- Built-in timer with progress tracking

### Daily Reset System
- Automatic midnight detection based on local timezone
- History tracking of daily progress
- Smart handling of repeating tasks
- New motivational quote each day

### History Panel
- View last 7 days of progress
- Visual representation of weighted completion
- Track productivity trends over time

### Customization
- **Dark Mode**: Light and dark themes with smooth transitions
- **Accent Colors**: Choose from Blue, Purple, Green, or Orange
- **Sound Effects**: Optional completion chimes
- **Pomodoro Settings**: Customize work and break durations

### Data Management
- **Export/Import**: Save and restore your data as JSON
- **Reset All Data**: Start fresh with confirmation protection
- **Offline-First**: All data stored locally in browser

### Keyboard Shortcuts
- `N` - Focus new task input
- `Enter` - Add task (when input focused)
- `J` / `K` - Navigate between tasks
- `Space` or `Ctrl+D` - Toggle task completion
- `F` - Enter Focus Mode
- `Esc` - Exit input fields

## Technology Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **localStorage** - Offline data persistence

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Data Model

All data is stored in localStorage under the key `focusForge_v1`:

```typescript
{
  tasks: Task[],
  settings: {
    theme: 'light' | 'dark',
    accent: 'blue' | 'purple' | 'green' | 'orange',
    pomodoro: { work: number, break: number },
    soundsOn: boolean
  },
  mood: { value: string, savedAt: string },
  history: HistoryEntry[],
  quoteOfDay: { id: number, text: string },
  lastResetDate: string,
  ui: { showFocusMode: boolean }
}
```

### Task Structure

```typescript
{
  id: string,
  text: string,
  priority: 'low' | 'medium' | 'high',
  priorityWeight: 1 | 2 | 3,
  repeatDaily: boolean,
  tags: string[],
  notes: string,
  done: boolean,
  createdAt: string (ISO)
}
```

## Architecture

### Component Structure

```
src/
├── components/
│   ├── Header.jsx          # App title, mood selector
│   ├── QuoteDisplay.jsx    # Daily motivational quote
│   ├── TaskInput.jsx       # New task creation
│   ├── TaskList.jsx        # Task list with filters
│   ├── TaskItem.jsx        # Individual task component
│   ├── ProgressRing.jsx    # Weighted progress visualization
│   ├── PomodoroTimer.jsx   # Timer with controls
│   ├── FocusMode.jsx       # Fullscreen focus interface
│   ├── HistoryPanel.jsx    # Progress history
│   └── SettingsModal.jsx   # Configuration panel
├── contexts/
│   └── ThemeContext.jsx    # Theme and mood management
├── hooks/
│   ├── useAppData.js       # Data management and persistence
│   └── useKeyboardShortcuts.js # Keyboard navigation
├── utils/
│   ├── storage.js          # localStorage utilities
│   └── taskUtils.js        # Task calculations
└── App.tsx                 # Main application component
```

## Features in Detail

### Weighted Progress System

Tasks are assigned points based on priority:
- Low priority = 1 point
- Medium priority = 2 points
- High priority = 3 points

Progress is calculated as: `(completed points / total points) × 100%`

This encourages focusing on high-priority tasks first.

### Daily Reset Behavior

At midnight (local time):
1. Current day's progress is saved to history
2. Tasks with `repeatDaily: true` reset to incomplete
3. A new random quote is selected
4. `lastResetDate` is updated to today

The app checks for date changes on load and every minute while running.

### Focus Mode Features

- **Fullscreen Interface**: Minimal, distraction-free design
- **Current Task Display**: Shows the first incomplete task
- **Progress Timer**: Visual countdown with progress bar
- **Distraction Shield**: Optional overlay requiring 3-second hold to exit
- **Ambient Sounds**: Choose from Nature, Rain, or Silence
- **Motivational Quote**: Displays your daily quote for inspiration

### Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly

## Tips for Use

1. **Morning Routine**: Select your mood, review your quote, add your tasks
2. **Prioritize**: Use High priority for must-do items, Medium for important, Low for nice-to-have
3. **Repeating Tasks**: Mark daily habits (exercise, reading) as repeating
4. **Focus Sessions**: Use Focus Mode with Distraction Shield for deep work
5. **Review**: Check History panel to track your productivity trends

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with localStorage support

## Privacy

FocusForge runs entirely in your browser. No data is sent to any server. All information is stored locally using localStorage. Export your data regularly to create backups.

## License

MIT License - feel free to use and modify for personal or commercial projects.

---

**Built with focus. Designed for productivity. Made for you.**
