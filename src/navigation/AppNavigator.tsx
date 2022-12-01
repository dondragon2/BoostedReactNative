import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { Song } from '../data/types';
import ListingScreen from '../screens/ListingScreen';
import PlayerScreen from '../screens/PlayerScreen';

export enum Routes {
  listing = 'Listing',
  player = 'Player',
}

export type AppNavigatorParamList = {
  Listing: undefined;
  Player: { song?: Song };
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

export type AppNavigationProp =
  NativeStackNavigationProp<AppNavigatorParamList>;

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName={Routes.player}
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Routes.player} component={PlayerScreen} />
    <Stack.Screen
      name={Routes.listing}
      component={ListingScreen}
      options={{ presentation: 'modal' }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
