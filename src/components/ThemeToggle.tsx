
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-600 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 text-white dark:text-white hover:bg-gray-700/50 dark:hover:bg-gray-700/50"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
