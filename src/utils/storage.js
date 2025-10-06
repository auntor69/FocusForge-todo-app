const STORAGE_KEY = 'focusForge_v1';

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "Focus on being productive instead of busy.",
  "You don't have to be great to start, but you have to start to be great.",
  "Small daily improvements over time lead to stunning results.",
  "The only way to do great work is to love what you do.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for opportunity. Create it.",
  "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles."
];

const getSeedTasks = () => {
  const now = new Date();
  const today = now.toISOString();

  return [
    {
      id: 't-1',
      text: 'Read 20 pages - Economics',
      priority: 'high',
      priorityWeight: 3,
      repeatDaily: false,
      tags: ['study'],
      notes: '',
      done: false,
      createdAt: new Date(now.getTime() - 3600000).toISOString()
    },
    {
      id: 't-2',
      text: 'Morning jog 20 mins',
      priority: 'medium',
      priorityWeight: 2,
      repeatDaily: true,
      tags: ['health'],
      notes: '',
      done: false,
      createdAt: new Date(now.getTime() - 7200000).toISOString()
    },
    {
      id: 't-3',
      text: 'Reply to 3 client messages',
      priority: 'high',
      priorityWeight: 3,
      repeatDaily: false,
      tags: ['work'],
      notes: '',
      done: false,
      createdAt: today
    }
  ];
};

export const defaultData = {
  tasks: [],
  settings: {
    theme: 'light',
    accent: 'blue',
    pomodoro: { work: 1500, break: 300 },
    soundsOn: true
  },
  mood: { value: 'Calm', savedAt: getTodayString() },
  history: [],
  quoteOfDay: getRandomQuote(),
  lastResetDate: getTodayString(),
  ui: { showFocusMode: false }
};

export function getTodayString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function getRandomQuote() {
  const id = Math.floor(Math.random() * QUOTES.length);
  return { id, text: QUOTES[id] };
}

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const seedData = { ...defaultData, tasks: getSeedTasks() };
      saveData(seedData);
      return seedData;
    }
    const parsed = JSON.parse(stored);
    return { ...defaultData, ...parsed };
  } catch (error) {
    console.error('Failed to load data:', error);
    return defaultData;
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

export function exportData(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `focusforge-backup-${getTodayString()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        const merged = { ...defaultData, ...imported };
        resolve(merged);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export const QUOTES_LIST = QUOTES;
