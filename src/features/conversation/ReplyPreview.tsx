import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useReply } from '../../hooks/useReply';
import { colors } from '../../theme';

const ReplyPreview = () => {
  const { replyingTo, cancelReply } = useReply();

  if (!replyingTo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1}>
        Replying to: {replyingTo.text}
      </Text>
      <Pressable onPress={cancelReply}>
        <Text style={styles.close}>✕</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  text: { flex: 1, fontSize: 12, color: colors.muted },
  close: { paddingHorizontal: 8, fontSize: 14, color: colors.muted },
});

export default ReplyPreview;
