import React from 'react';
import { Alert } from 'react-native';
import { Recommendation } from '../../types/conversation';
import { CardProps } from './RecommendationCard';
import {
  ArticleCard,
  ConsultationCard,
  FallbackCard,
  GemstoneCard,
  PromotionCard,
  TarotCard,
} from './cards';

export type RecommendationEntry = {
  Card: React.ComponentType<CardProps>;
  onPress: (item: Recommendation) => void;
};

const showAlert = (item: Recommendation) =>
  Alert.alert(item.title, `Opening ${item.type} experience`);

// To add a new recommendation type: add it to RecommendationType,
// create a card in ./cards and register it here.
const registry: Record<string, RecommendationEntry> = {
  gemstone: { Card: GemstoneCard, onPress: showAlert },
  tarot: { Card: TarotCard, onPress: showAlert },
  consultation: { Card: ConsultationCard, onPress: showAlert },
  article: { Card: ArticleCard, onPress: showAlert },
  promotion: { Card: PromotionCard, onPress: showAlert },
};

const fallbackEntry: RecommendationEntry = {
  Card: FallbackCard,
  onPress: showAlert,
};

export const getRecommendationEntry = (type: string): RecommendationEntry =>
  registry[type] ?? fallbackEntry;
