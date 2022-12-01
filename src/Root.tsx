import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { useStatusBarStyle, useTheme } from './themes/hooks';

export default () => {
  const theme = useTheme();
  const { content, color } = useStatusBarStyle();
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <StatusBar barStyle={content} backgroundColor={color} />
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};
