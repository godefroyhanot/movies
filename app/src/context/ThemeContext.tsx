import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../../../constants/theme';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof Colors.light;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useColorScheme() as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(systemTheme || 'light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = Colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
