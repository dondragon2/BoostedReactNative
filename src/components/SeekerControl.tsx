import Slider from '@react-native-community/slider';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { useTheme } from '../themes/hooks';

const screenWidth = Dimensions.get('window').width;

interface Props {
  progress: number;
  duration: number;
  onSeeking: (val: number) => void;
}

const pad = (num: number, length: number) => {
  let str = `${num}`;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};
const durationText = (val: number) => {
  const minutes = Math.floor(val > 0 ? val / 60 : 0);
  const seconds = Math.floor(val > 0 ? val % 60 : 0);
  return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
};

const SeekerControl: React.FC<Props> = ({ progress, duration, onSeeking }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const onDrag = (value: number) => {
    onSeeking(value);
  };
  return (
    <View style={styles.root}>
      <View style={styles.progressStatus}>
        <View style={styles.duration}>
          <Text category="p2">{durationText(progress)}</Text>
        </View>
        <View style={styles.progress}>
          <Text category="p2">{durationText(duration - progress)}</Text>
        </View>
      </View>
      <Slider
        style={styles.slider}
        onValueChange={onDrag}
        maximumValue={Math.floor(duration)}
        value={Math.floor(progress)}
        minimumValue={0}
        step={1}
        minimumTrackTintColor={theme['color-primary-500']}
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  root: {
    marginBottom: 4,
  },
  progressStatus: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 2,
  },
  slider: {
    width: screenWidth * 0.8,
  },
  duration: {
    flex: 1,
    alignItems: 'flex-start',
  },
  progress: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default SeekerControl;
