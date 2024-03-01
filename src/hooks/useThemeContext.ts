import { useContext } from 'react';
import { ThemeContext } from '../hoc';

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext };
