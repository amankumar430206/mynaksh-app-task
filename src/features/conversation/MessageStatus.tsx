import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';
import { MessageStatus as Status } from '../../types/conversation';

type Props = {
  status: Status;
  onRetry: () => void;
};

const LABELS: Record<Status, string> = {
  sending: 'Sending...',
  sent: 'Sent',
  failed: 'Failed',
};

const MessageStatus = ({ status, onRetry }: Props) => (
  <View style={styles.row}>
    <Text style={[styles.text, status === 'failed' && styles.failed]}>
      {LABELS[status]}
    </Text>
    {status === 'failed' ? (
      <Pressable onPress={onRetry}>
        <Text style={styles.retry}>Retry</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignSelf: 'flex-end', marginTop: 2 },
  text: { fontSize: 11, color: colors.muted },
  failed: { color: colors.danger },
  retry: { fontSize: 11, marginLeft: 8, fontWeight: '700', color: colors.primary },
});

export default MessageStatus;
