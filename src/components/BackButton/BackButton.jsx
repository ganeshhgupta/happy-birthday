 
// src/components/BackButton/BackButton.js
import React from 'react';
import { ChevronLeft } from 'lucide-react';

const BackButton = ({ onClick, theme = 'dark' }) => {
  const darkTheme = {
    buttonClass: "bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-400 hover:shadow-white/30",
    iconClass: "text-white",
  };

  const lightTheme = {
    buttonClass: "bg-white/20 backdrop-blur-md hover:bg-white/30 border-white/20 hover:border-white/40",
    iconClass: "text-white",
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <button
      onClick={onClick}
      className={`group fixed top-4 left-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border hover:shadow-lg ${currentTheme.buttonClass}`}
    >
      <ChevronLeft className={`w-5 h-5 group-hover:translate-x-[-2px] transition-transform ${currentTheme.iconClass}`} />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-lg transition-all duration-300"></div>
      {theme === 'light' && (
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
      )}
    </button>
  );
};

export default BackButton;