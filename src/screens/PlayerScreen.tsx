import { useNavigation } from '@react-navigation/native';
import {
  Layout,
  StyleService,
  Text,
  TopNavigation,
  useStyleSheet,
} from '@ui-kitten/components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import ControlPanel from '../components/ControlPanel';
import { UpIcon } from '../components/icons';
import InfoTile from '../components/InfoTile';
import SeekerControl from '../components/SeekerControl';
import ThemeToggle from '../components/ThemeToggle';
import { Song } from '../data/types';
import { AppNavigationProp, Routes } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../store';
import { next } from '../store/reducers/player';
import { useTheme } from '../themes/hooks';

const PlayerScreen = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AppNavigationProp>();
  const [last, setLast] = useState<Song>();

  const { current, playing, repeat } = useAppSelector(state => state.player);

  const progressInterval = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);

  const dispatchNext = useCallback(() => {
    dispatch(next());
  }, [dispatch]);

  useEffect(() => {
    progressInterval.current = setInterval(() => {
      if (playing) {
        setProgress(old => old + 1);
      }
    }, 1000);

    return () => {
      clearInterval(progressInterval.current || 0);
    };
  }, [playing]);

  useEffect(() => {
    if (current !== last && current.title !== last?.title) {
      setLast(current);
      setProgress(0);
    }
  }, [current, last]);

  useEffect(() => {
    if (progress >= current.duration && playing) {
      if (!repeat) {
        dispatchNext();
      }
      setProgress(0);
    }
  }, [progress, current, repeat, dispatchNext, playing]);

  const renderRightAction = () => <ThemeToggle />;

  const onSeeking = (val: number) => {
    setProgress(val);
  };

  const onReset = () => {
    setProgress(0);
  };

  const onNavigate = () => {
    navigation.navigate(Routes.listing);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.root}>
        <TopNavigation
          alignment="center"
          title="NOW PLAYING"
          accessoryRight={renderRightAction}
        />
        <View style={styles.body}>
          <InfoTile />
        </View>
        <View style={styles.playerView}>
          <View style={styles.player}>
            <SeekerControl
              progress={progress}
              duration={current.duration}
              onSeeking={onSeeking}
            />
            <ControlPanel onReset={onReset} />
            <TouchableOpacity
              style={styles.playlistButton}
              onPress={onNavigate}>
              <UpIcon fill={theme['color-primary-500']} style={styles.upIcon} />
              <Text category="c2">PLAYLIST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: 'background-basic-color-4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerView: {
    flex: 0.6,
    backgroundColor: 'background-basic-color-4',
  },
  player: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistButton: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upIcon: { height: 16, width: 16 },
});

export default PlayerScreen;
