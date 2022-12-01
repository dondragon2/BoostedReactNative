import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../themes/hooks';

import AppNavigator from './AppNavigator';

const Navigation = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
