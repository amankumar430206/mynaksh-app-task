import React, { useMemo, useRef } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text } from 'react-native';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { colors } from '../../theme';
import { Message, TimelineRow } from '../../types/conversation';
import { groupMessages } from '../../utils/groupMessages';
import { messageRenderers } from './messageRegistry';
import TypingIndicator from './TypingIndicator';

type Props = {
  messages: Message[];
  typing: boolean;
};

const renderItem: ListRenderItem<TimelineRow> = ({ item }) => {
  if (item.kind === 'date') {
    return <Text style={styles.date}>{item.label}</Text>;
  }
  const Renderer = messageRenderers[item.message.type];
  return (
    <Renderer
      message={item.message}
      isFirstInGroup={item.isFirstInGroup}
      isLastInGroup={item.isLastInGroup}
    />
  );
};

const keyExtractor = (row: TimelineRow) => row.key;

const Timeline = ({ messages, typing }: Props) => {
  const listRef = useRef<FlatList<TimelineRow>>(null);
  const rows = useMemo(() => groupMessages(messages), [messages]);
  const scrollOnLayout = useAutoScroll(listRef, messages.length, typing);

  return (
    <FlatList
      ref={listRef}
      data={rows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={typing ? <TypingIndicator /> : undefined}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      onContentSizeChange={scrollOnLayout}
      initialNumToRender={10}
      windowSize={7}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: { paddingVertical: 8 },
  date: {
    alignSelf: 'center',
    marginVertical: 8,
    fontSize: 12,
    color: colors.muted,
  },
});

export default Timeline;
