import { Button } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { previous } from '../store/reducers/player';
import { PrevIcon } from './icons';

const backDelay = 500;

interface Props {
  onReset: () => void;
}

const PreviousButton: React.FC<Props> = ({ onReset }) => {
  const dispatch = useAppDispatch();
  const { allowPrevious } = useAppSelector(state => state.player);
  const [singlePress, setSinglePress] = useState(true);
  const [lastPress, setLastPress] = useState(new Date().getTime());
  const pressTimer = useRef(0);

  const onPrevious = () => {
    const now = new Date().getTime();
    if (!singlePress) {
      if (now - lastPress < backDelay) {
        clearTimeout(pressTimer.current);
        dispatch(previous());
        setSinglePress(true);
      }
    } else {
      setSinglePress(false);

      pressTimer.current = setTimeout(() => {
        setSinglePress(true);
        clearTimeout(pressTimer.current);
        onReset();
      }, backDelay);

      setLastPress(now);
    }
  };

  return (
    <Button
      accessoryLeft={PrevIcon}
      size="small"
      appearance="outline"
      style={styles.button}
      onPress={onPrevious}
      disabled={!allowPrevious}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
  },
});

export default PreviousButton;
