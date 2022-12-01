import * as eva from '@eva-design/eva';
import { createSlice } from '@reduxjs/toolkit';
import { default as theme } from './theme.json';
import { createNavigationTheme, substituteThemeColors } from './utils';

const lightTheme = { ...eva.light, ...theme };
const darkTheme = { ...eva.dark, ...theme };

export interface ThemeState {
  theme: any;
  darkMode: boolean;
}

const initialState: ThemeState = {
  theme: {
    ...substituteThemeColors(lightTheme),
    ...createNavigationTheme(lightTheme, false),
  },
  darkMode: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: state => {
      const toggled = !state.darkMode;
      state.darkMode = toggled;

      const newTheme = toggled ? darkTheme : lightTheme;

      state.theme = {
        ...substituteThemeColors(newTheme),
        ...createNavigationTheme(newTheme, toggled),
      };
    },
  },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
