/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ScreenBase } from './components';
import { Main, SearchCard } from './screens';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Main"
          component={Main}
        />
        <Stack.Screen
          name="CardLookup"
          component={SearchCard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
