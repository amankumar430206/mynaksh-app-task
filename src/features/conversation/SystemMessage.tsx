import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../theme';
import { MessageProps } from './types';

const SystemMessage = ({ message }: MessageProps) => (
  <Text style={styles.text}>{message.text}</Text>
);

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    marginVertical: 8,
    paddingHorizontal: 24,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },
});

export default React.memo(SystemMessage);
