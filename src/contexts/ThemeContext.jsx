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
    gradient: 'from-blue-50 to-white',
    accent: '#60A5FA',
    emoji: '😌'
  },
  Motivated: {
    name: 'Motivated',
    gradient: 'from-orange-50 to-orange-100',
    accent: '#FB923C',
    emoji: '🔥'
  },
  Tired: {
    name: 'Tired',
    gradient: 'from-gray-800 to-gray-900',
    accent: '#9CA3AF',
    emoji: '😴'
  },
  Focused: {
    name: 'Focused',
    gradient: 'from-green-50 to-emerald-50',
    accent: '#34D399',
    emoji: '🎯'
  },
  Stressed: {
    name: 'Stressed',
    gradient: 'from-purple-50 to-pink-50',
    accent: '#C084FC',
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
  const [theme, setTheme] = useState(initialTheme);
  const [mood, setMood] = useState(initialMood);
  const [accent, setAccent] = useState(initialAccent);

  const moodTheme = moodThemes[mood] || moodThemes.Calm;
  const accentColor = accentColors[accent] || accentColors.blue;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
