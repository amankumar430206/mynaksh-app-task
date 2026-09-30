import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../theme';

const Dot = ({ delay }: { delay: number }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 350 }),
          withTiming(0, { duration: 350 }),
        ),
        -1,
      ),
    );
  }, [delay, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: 0.35 + progress.value * 0.65,
    transform: [{ translateY: -4 * progress.value }],
  }));

  return <Animated.View style={[styles.dot, style]} />;
};

const TypingIndicator = () => (
  <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.wrapper}>
    <Text style={styles.label}>✨ AI Astrologer is reading your chart</Text>
    <View style={styles.bubble}>
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 12, marginBottom: 10 },
  label: { fontSize: 11, fontWeight: '700', color: colors.primary, marginBottom: 3 },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.ai,
  },
  dot: {
    width: 8,
    height: 8,
    marginHorizontal: 3,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});

export default TypingIndicator;
