import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useMessageActions } from '../../hooks/useMessageActions';
import { useSendMessage } from '../../hooks/useSendMessage';
import { colors } from '../../theme';
import RecommendationList from '../recommendations/RecommendationList';
import FeedbackBar from './FeedbackBar';
import MessageStatus from './MessageStatus';
import { MessageProps } from './types';

type Variant = {
  own: boolean;
  bubbleColor: string;
  textColor: string;
  label?: string;
  longPressActions: boolean;
  feedback: boolean;
};

export const VARIANTS = {
  user: {
    own: true,
    bubbleColor: colors.user,
    textColor: colors.onPrimary,
    longPressActions: false,
    feedback: false,
  },
  ai: {
    own: false,
    bubbleColor: colors.ai,
    textColor: colors.text,
    label: '✨ AI Astrologer',
    longPressActions: true,
    feedback: true,
  },
  human: {
    own: false,
    bubbleColor: colors.human,
    textColor: colors.text,
    label: '🧑‍🏫 Astrologer',
    longPressActions: true,
    feedback: false,
  },
} satisfies Record<string, Variant>;

type Props = MessageProps & {
  variant: Variant;
};

const ChatMessage = ({ message, isFirstInGroup, isLastInGroup, variant }: Props) => {
  const openActions = useMessageActions();
  const { retry } = useSendMessage();

  return (
    <Animated.View
      entering={message.animate ? FadeInDown.duration(350) : undefined}
      style={[styles.wrapper, { marginBottom: isLastInGroup ? 10 : 2 }]}>
      {variant.label && isFirstInGroup ? (
        <Text style={styles.label}>{variant.label}</Text>
      ) : null}
      <Pressable
        onLongPress={
          variant.longPressActions ? () => openActions(message) : undefined
        }
        style={[
          styles.bubble,
          variant.own ? styles.ownBubble : styles.fullBubble,
          { backgroundColor: variant.bubbleColor },
        ]}>
        {message.replyTo ? (
          <View style={styles.quote}>
            <Text style={styles.quoteText} numberOfLines={2}>
              {message.replyTo.text}
            </Text>
          </View>
        ) : null}
        <Text style={{ color: variant.textColor }}>{message.text}</Text>
      </Pressable>
      {message.recommendations?.length ? (
        <RecommendationList
          items={message.recommendations}
          animate={message.animate}
        />
      ) : null}
      {variant.feedback && isLastInGroup ? (
        <FeedbackBar messageId={message.id} />
      ) : null}
      {message.status ? (
        <MessageStatus
          status={message.status}
          onRetry={() => retry(message.id)}
        />
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%', paddingHorizontal: 12 },
  ownBubble: { alignSelf: 'flex-end', maxWidth: '85%' },
  fullBubble: { alignSelf: 'stretch' },
  label: { fontSize: 11, fontWeight: '700', color: colors.primary, marginBottom: 3 },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quote: {
    padding: 6,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.warn,
    backgroundColor: 'rgba(128,48,3,0.12)',
  },
  quoteText: { fontSize: 12, color: 'rgba(128,128,128,1)' },
});

export default React.memo(ChatMessage);
