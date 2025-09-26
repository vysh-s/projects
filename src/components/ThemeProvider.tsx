import React, { createContext, useContext } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  theme: string;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const setTheme = (newTheme: string) => {
    localStorage.setItem('brainrot-buster-theme', newTheme);
    // In a real app, this would trigger a re-render
  };

  const themeClasses = {
    neon: 'theme-neon',
    retro: 'theme-retro',
    cosmic: 'theme-cosmic',
    ocean: 'theme-ocean'
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={themeClasses[theme as keyof typeof themeClasses] || themeClasses.neon}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}