import {
  Button,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import {
  next,
  pause,
  play,
  toggleRepeat,
  toggleShuffle,
} from '../store/reducers/player';
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
} from './icons';
import PreviousButton from './PreviousButton';

interface Props {
  onReset: () => void;
}
const ControlPanel: React.FC<Props> = ({ onReset }) => {
  const dispatch = useAppDispatch();
  const { shuffle, repeat, allowNext, playing } = useAppSelector(
    state => state.player,
  );
  const styles = useStyleSheet(themedStyles);

  const onShuffle = () => {
    dispatch(toggleShuffle());
  };

  const onRepeat = () => {
    dispatch(toggleRepeat());
  };

  const onNext = () => {
    dispatch(next());
  };

  const onPlay = () => {
    dispatch(play());
  };

  const onPause = () => {
    dispatch(pause());
  };

  return (
    <Layout style={styles.buttons}>
      <Button
        accessoryLeft={ShuffleIcon}
        appearance={shuffle ? 'filled' : 'ghost'}
        size="small"
        onPress={onShuffle}
      />

      <PreviousButton onReset={onReset} />

      <TouchableOpacity
        style={styles.playButton}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
          <PauseIcon fill="#FFFFFF" style={styles.playButtonIcon} />
        ) : (
          <PlayIcon fill="#FFFFFF" style={styles.playButtonIcon} />
        )}
      </TouchableOpacity>

      <Button
        accessoryLeft={NextIcon}
        size="small"
        appearance="outline"
        style={styles.button}
        onPress={onNext}
        disabled={!allowNext}
      />
      <Button
        accessoryLeft={RepeatIcon}
        appearance={repeat ? 'filled' : 'ghost'}
        size="small"
        onPress={onRepeat}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  button: {
    marginHorizontal: 8,
  },
  playButton: {
    height: 90,
    width: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'color-primary-600',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-500',
  },
  playButtonIcon: {
    height: 42,
    width: 42,
  },
});
export default ControlPanel;
