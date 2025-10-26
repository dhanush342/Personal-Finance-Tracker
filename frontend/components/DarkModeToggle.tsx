
import React from 'react';
import { Icon } from './Icon';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
    >
      {isDarkMode ? (
        <Icon name="sun" className="h-6 w-6" />
      ) : (
        <Icon name="moon" className="h-6 w-6" />
      )}
    </button>
  );
};

export default DarkModeToggle;
