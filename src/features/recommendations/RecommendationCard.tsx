import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Recommendation } from '../../types/conversation';
import { colors } from '../../theme';

export type CardProps = {
  item: Recommendation;
  onPress: (item: Recommendation) => void;
};

type BaseProps = CardProps & {
  icon: string;
  label: string;
  accent: string;
};

const RecommendationCard = ({ item, onPress, icon, label, accent }: BaseProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.card,
      { borderColor: accent },
      pressed && styles.pressed,
    ]}
    onPress={() => onPress(item)}>
    <View style={[styles.iconWrap, { backgroundColor: accent + '26' }]}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
    <View style={styles.body}>
      <Text style={[styles.label, { color: accent }]}>{label}</Text>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      {item.subtitle ? (
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>
      ) : null}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 210,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: colors.card,
  },
  pressed: { opacity: 0.7 },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 16 },
  body: { flex: 1, marginLeft: 8 },
  label: { fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  title: { fontSize: 13, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 11, color: colors.muted },
});

export default React.memo(RecommendationCard);
