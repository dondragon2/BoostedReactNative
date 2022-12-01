import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThemeState } from '../themes/themeSlice';
import reducers from './reducers';
import { PlayerState } from './reducers/player';

export interface IRootStore {
  theme: ThemeState;
  player: PlayerState;
}

export const store = configureStore<IRootStore>({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
