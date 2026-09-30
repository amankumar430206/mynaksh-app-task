import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

const Chip = ({ label, selected, onPress }: Props) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, selected && styles.selected]}>
    <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginTop: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { fontSize: 12, color: colors.text },
  selectedText: { color: colors.onPrimary, fontWeight: '700' },
});

export default Chip;
