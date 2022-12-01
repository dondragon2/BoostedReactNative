import { StatusBarStyle } from 'react-native';
import { useAppSelector } from '../store';

export const useTheme = () => {
  const { theme } = useAppSelector(state => state.theme);
  return theme;
};

export const useDarkMode = () => {
  const { darkMode } = useAppSelector(state => state.theme);
  return darkMode;
};

export const useStatusBarStyle = () => {
  const { darkMode, theme } = useAppSelector(state => state.theme);
  const content: StatusBarStyle = darkMode ? 'light-content' : 'dark-content';
  const color = theme.colors.background;
  return { content, color };
};
