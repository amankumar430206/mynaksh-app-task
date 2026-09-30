import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import Chip from '../../components/Chip';
import { useFeedback } from '../../hooks/useFeedback';
import { colors } from '../../theme';

const DISLIKE_REASONS = ['Inaccurate', 'Too Generic', "Didn't Help", 'Too Long'];

type Props = {
  messageId: string;
};

const FeedbackBar = ({ messageId }: Props) => {
  const { feedback, like, dislike, selectReason } = useFeedback(messageId);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          style={[styles.button, feedback?.value === 'like' && styles.active]}
          onPress={like}>
          <Text>👍</Text>
        </Pressable>
        <Pressable
          style={[styles.button, feedback?.value === 'dislike' && styles.active]}
          onPress={dislike}>
          <Text>👎</Text>
        </Pressable>
      </View>
      {feedback?.value === 'dislike' ? (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutUp}
          style={styles.chips}>
          {DISLIKE_REASONS.map(reason => (
            <Chip
              key={reason}
              label={reason}
              selected={feedback.reason === reason}
              onPress={() => selectReason(reason)}
            />
          ))}
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 6 },
  row: { flexDirection: 'row' },
  button: { paddingHorizontal: 8, paddingVertical: 4, marginRight: 4, borderRadius: 12 },
  active: { backgroundColor: colors.border },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
});

export default React.memo(FeedbackBar);
