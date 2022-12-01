import {
  Button,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { Song } from '../data/types';
import { useAppDispatch, useAppSelector } from '../store';
import { playFromList } from '../store/reducers/player';
import { useDarkMode, useTheme } from '../themes/hooks';
import { PlayIcon } from './icons';

interface Props {
  song: Song;
  index: number;
}

const RecentTile: React.FC<Props> = ({ song, index }) => {
  const dispatch = useAppDispatch();
  const isDarkMode = useDarkMode();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { currentIndex, playing } = useAppSelector(state => state.player);

  const selected = index === currentIndex && playing;
  const backgroundColor = selected ? theme['color-primary-100'] : 'transparent';
  const textColor =
    selected && isDarkMode
      ? theme['background-basic-color-1']
      : theme['text-basic-color'];

  const onSelect = () => {
    dispatch(playFromList(index));
  };

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor,
        },
      ]}>
      <View style={styles.iconView}>
        <View style={styles.iconCircle}>
          <Icon style={styles.icon} fill="#FFFFFF" name="music-outline" />
        </View>
      </View>
      <View style={styles.details}>
        <Text category="s1" numberOfLines={1} style={{ color: textColor }}>
          {song.title}
        </Text>
        <Text category="c1" numberOfLines={1} style={{ color: textColor }}>
          {song.artist}
        </Text>
      </View>
      <View style={styles.playing}>
        {selected ? (
          <Text category="c2" style={{ color: textColor }}>
            playing...
          </Text>
        ) : (
          <Button accessoryLeft={PlayIcon} size="tiny" onPress={onSelect} />
        )}
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  root: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'lightgray',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  iconView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 100,
    backgroundColor: 'color-primary-900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  details: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  playing: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default RecentTile;
