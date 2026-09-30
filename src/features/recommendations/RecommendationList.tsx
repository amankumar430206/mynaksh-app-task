import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Recommendation } from '../../types/conversation';
import { getRecommendationEntry } from './registry';

type Props = {
  items: Recommendation[];
  animate?: boolean;
};

const CARD_STAGGER = 150;
const FIRST_CARD_DELAY = 350;

const keyExtractor = (item: Recommendation) => `${item.type}-${item.id}`;

const RecommendationList = ({ items, animate }: Props) => {
  const renderItem: ListRenderItem<Recommendation> = useCallback(
    ({ item, index }) => {
      const { Card, onPress } = getRecommendationEntry(item.type);
      const card = <Card item={item} onPress={onPress} />;
      if (!animate) {
        return card;
      }
      return (
        <Animated.View
          entering={FadeInRight.delay(FIRST_CARD_DELAY + index * CARD_STAGGER)}>
          {card}
        </Animated.View>
      );
    },
    [animate],
  );

  return (
    <FlatList
      horizontal
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: { marginTop: 8 },
});

export default React.memo(RecommendationList);
