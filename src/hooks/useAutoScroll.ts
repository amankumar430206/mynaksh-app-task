import { RefObject, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

// Scrolls to the end on first layout, when items are appended, and when the
// typing indicator appears. Removing items does not scroll, so delete keeps
// the position.
export const useAutoScroll = <T>(
  listRef: RefObject<FlatList<T> | null>,
  count: number,
  typing: boolean,
) => {
  const previousCount = useRef(count);
  const previousTyping = useRef(typing);
  const initialDone = useRef(false);

  useEffect(() => {
    const appended = count > previousCount.current;
    const typingStarted = typing && !previousTyping.current;
    if (appended || typingStarted) {
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 60);
    }
    previousCount.current = count;
    previousTyping.current = typing;
  }, [count, typing, listRef]);

  return () => {
    if (!initialDone.current) {
      initialDone.current = true;
      listRef.current?.scrollToEnd({ animated: false });
    }
  };
};
