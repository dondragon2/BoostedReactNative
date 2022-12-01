import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../data/types';
import songList from '../../data/songlist.json';

export interface PlayerState {
  songs: Song[];
  current: Song;
  currentIndex: number;
  shuffle: boolean;
  repeat: boolean;
  playing: boolean;
  history: number[];
  allowNext: boolean;
  allowPrevious: boolean;
}

const initialState: PlayerState = {
  songs: songList.songs,
  currentIndex: 0,
  current: songList.songs[0],
  shuffle: false,
  repeat: false,
  playing: false,
  history: [],
  allowNext: true,
  allowPrevious: false,
};

const shuffle = (arr: Song[]) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndexToSwap = Math.floor(Math.random() * i);
    const temp = arr[randomIndexToSwap];
    arr[randomIndexToSwap] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    toggleShuffle: state => {
      const shuffleState = !state.shuffle;
      state.songs = shuffleState ? shuffle(state.songs) : songList.songs;
      state.current = state.playing ? state.current : state.songs[0];
      state.currentIndex = state.songs.findIndex(
        s =>
          s.artist === state.current.artist &&
          s.title === state.current.title &&
          s.duration === state.current.duration,
      );
      state.shuffle = shuffleState;
    },
    toggleRepeat: state => {
      state.repeat = !state.repeat;
    },
    play: state => {
      state.playing = true;
    },
    playFromList: (state, action: PayloadAction<number>) => {
      state.current = state.songs[action.payload];
      state.currentIndex = action.payload;
      state.allowPrevious = action.payload > 0;
      state.allowNext = action.payload < state.songs.length - 1;
      state.playing = true;
    },
    pause: state => {
      state.playing = false;
    },
    next: state => {
      const currentIndex = Math.min(
        state.currentIndex + 1,
        state.songs.length - 1,
      );
      if (currentIndex + 1 >= state.songs.length) {
        state.playing = false;
      }
      state.currentIndex = currentIndex;
      state.current = state.songs[currentIndex];
      state.allowPrevious = currentIndex > 0;
      state.allowNext = currentIndex < state.songs.length - 1;
    },
    previous: state => {
      const currentIndex = Math.max(0, state.currentIndex - 1);
      state.currentIndex = currentIndex;
      state.current = state.songs[currentIndex];
      state.allowPrevious = currentIndex > 0;
      state.allowNext = currentIndex < state.songs.length - 1;
    },
  },
});

export const {
  toggleShuffle,
  toggleRepeat,
  play,
  playFromList,
  pause,
  next,
  previous,
} = playerSlice.actions;

export default playerSlice.reducer;
