import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationScreen from '../screens/ConversationScreen';
import { colors } from '../theme';

export type RootStackParamList = {
  Conversation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Conversation"
      component={ConversationScreen}
      options={{
        title: '✨ AI Astrologer',
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: '700' },
      }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
