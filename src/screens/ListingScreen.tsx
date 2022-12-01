import { useNavigation } from '@react-navigation/native';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { DownIcon } from '../components/icons';
import RecentTile from '../components/RecentTile';
import SectionHeader from '../components/SectionHeader';
import { Song } from '../data/types';
import { useAppSelector } from '../store';

const ListingScreen = () => {
  const navigation = useNavigation();
  const { songs, currentIndex } = useAppSelector(store => store.player);
  const listRef = useRef<FlatList<Song>>(null);

  useEffect(() => {
    listRef.current?.scrollToIndex({ animated: true, index: currentIndex });
  }, [currentIndex, listRef]);

  const onBack = () => {
    navigation.goBack();
  };

  const renderLeftAction = () => (
    <TopNavigationAction icon={DownIcon} onPress={onBack} />
  );

  return (
    <SafeAreaView style={styles.root}>
      <Layout style={styles.layout}>
        <TopNavigation
          alignment="center"
          accessoryLeft={renderLeftAction}
          title="PLAYLIST"
        />
        <SectionHeader title="Recently Added" />
        <FlatList
          ref={listRef}
          data={songs}
          keyExtractor={item => item.title + item.artist}
          renderItem={({ item, index }) => (
            <RecentTile song={item} index={index} />
          )}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve =>
              setTimeout(() => {
                resolve(true);
              }, 500),
            );
            wait.then(() => {
              listRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  random: {
    marginVertical: 16,
  },
  randomContent: {
    height: 500,
    width: 150,
  },
  title: {
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 8,
  },
});

export default ListingScreen;
