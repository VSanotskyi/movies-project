import { Outlet } from 'react-router-dom';

import { Header } from '../components';
import { useThemeContext } from '../hooks';
import css from './theme.module.css';

const Layout = () => {
  const theme = useThemeContext();
  
  return (
    <div className={css[`${theme?.theme}`]}>
      <Header />
      <Outlet />
    </div>
  );
};

export { Layout };
