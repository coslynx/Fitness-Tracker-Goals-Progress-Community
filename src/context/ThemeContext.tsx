'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ThemeType } from '@/types/theme';

// Define the interface for the theme context
interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextProps>({
  theme: ThemeType.light, // Default to light mode
  setTheme: () => {},
});

// Define the ThemeProvider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the theme state with the default theme (light mode)
  const [theme, setTheme] = useState<ThemeType>(ThemeType.light);

  // Update the theme in local storage when the theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Check if there's a theme saved in local storage and update the theme state
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as ThemeType);
    }
  }, []);

  // Return the ThemeProvider component
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Define a hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;