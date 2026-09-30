import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content" />
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
