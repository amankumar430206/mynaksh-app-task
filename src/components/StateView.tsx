import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  message: string;
  loading?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

const StateView = ({ message, loading, actionLabel, onAction }: Props) => (
  <View style={styles.container}>
    {loading ? <ActivityIndicator color={colors.primary} /> : null}
    <Text style={styles.message}>{message}</Text>
    {actionLabel && onAction ? (
      <Pressable style={styles.button} onPress={onAction}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 40, marginBottom: 8 },
  message: { marginTop: 8, fontSize: 15, color: colors.muted, textAlign: 'center' },
  button: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.user,
  },
  buttonText: { color: colors.onPrimary, fontWeight: '600' },
});

export default StateView;
