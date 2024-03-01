import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

interface IProps extends PropsWithChildren {

}

type contextType = {
  theme: string
  setTheme: (data: string) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<contextType | null>(null);

const getTheme = () => {
  const theme = localStorage.getItem('theme');

  if (!theme) {
    localStorage.setItem('theme', 'light-theme');
    return 'light-theme';
  }

  return theme;
};

const ThemeProvider: FC<IProps> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
    } else {
      setTheme('dark-theme');
    }
  };

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem('theme', theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
