import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import Color from 'color';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../store';

const randomColor = () => {
  const color = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return Color(`#${color}`).alpha(0.4).string();
};

const InfoTile = () => {
  const styles = useStyleSheet(themeStyles);
  const { current } = useAppSelector(state => state.player);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  useEffect(() => {
    setBackgroundColor(randomColor());
  }, [current]);

  return (
    <View style={styles.root}>
      <View
        style={[
          {
            backgroundColor,
          },
          styles.background,
        ]}
      />
      <Text category="h4" numberOfLines={2} style={styles.title}>
        {current.title}
      </Text>
      <Text category="p1" style={styles.artist}>
        {current.artist}
      </Text>
    </View>
  );
};

const themeStyles = StyleService.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 250,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: 'color-basic-100',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    paddingHorizontal: 12,
  },
  title: {
    textAlign: 'center',
  },
  artist: {
    textAlign: 'center',
    marginTop: 8,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
});

export default InfoTile;
