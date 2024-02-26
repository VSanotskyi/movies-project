import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ThemeContext } from './hoc/ThemProvider';
import ContextProvider from './hoc/ContextProvider';
import css from './App.module.css';
import { router } from './router';

const App = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className={css[`${themeContext?.theme}`]}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
};

export default App;
