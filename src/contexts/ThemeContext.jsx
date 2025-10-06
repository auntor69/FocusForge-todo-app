import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const moodThemes = {
  Calm: {
    name: 'Calm',
    gradient: 'from-blue-50 via-blue-100 to-blue-50',
    accent: '#60A5FA',
    emoji: '😌'
  },
  Motivated: {
    name: 'Motivated',
    gradient: 'from-orange-50 via-orange-100 to-orange-50',
    accent: '#FB923C',
    emoji: '🔥'
  },
  Tired: {
    name: 'Tired',
    gradient: 'from-slate-100 via-slate-200 to-slate-100',
    accent: '#64748B',
    emoji: '😴'
  },
  Focused: {
    name: 'Focused',
    gradient: 'from-green-50 via-emerald-100 to-green-50',
    accent: '#34D399',
    emoji: '🎯'
  },
  Stressed: {
    name: 'Stressed',
    gradient: 'from-rose-50 via-pink-100 to-rose-50',
    accent: '#F43F5E',
    emoji: '😰'
  }
};

const accentColors = {
  blue: '#60A5FA',
  purple: '#C084FC',
  green: '#34D399',
  orange: '#FB923C'
};

export function ThemeProvider({ children, initialTheme = 'light', initialMood = 'Calm', initialAccent = 'blue' }) {
  const [theme, setTheme] = useState(() => {
    if (initialTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return initialTheme;
  });
  const [mood, setMood] = useState(initialMood);
  const [accent, setAccent] = useState(initialAccent);

  const moodTheme = moodThemes[mood] || moodThemes.Calm;
  const accentColor = accentColors[accent] || accentColors.blue;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      mood,
      setMood,
      moodTheme,
      accent,
      setAccent,
      accentColor,
      moodThemes,
      accentColors
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
