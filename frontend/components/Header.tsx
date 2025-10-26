
import React from 'react';
import { Icon } from './Icon';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Icon name="logo" className="h-8 w-8 text-blue-600 dark:text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Finance Tracker
          </h1>
        </div>
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;
