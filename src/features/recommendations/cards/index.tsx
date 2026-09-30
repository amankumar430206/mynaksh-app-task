import React from 'react';
import { colors } from '../../../theme';
import RecommendationCard, { CardProps } from '../RecommendationCard';

export const GemstoneCard = (props: CardProps) => (
  <RecommendationCard {...props} icon="💎" label="GEMSTONE" accent={colors.info} />
);

export const TarotCard = (props: CardProps) => (
  <RecommendationCard {...props} icon="🔮" label="TAROT" accent={colors.primary} />
);

export const ConsultationCard = (props: CardProps) => (
  <RecommendationCard {...props} icon="🧑‍🏫" label="CONSULT" accent={colors.ok} />
);

export const ArticleCard = (props: CardProps) => (
  <RecommendationCard {...props} icon="📖" label="LEARN" accent={colors.warn} />
);

export const PromotionCard = (props: CardProps) => (
  <RecommendationCard {...props} icon="🎁" label="OFFER" accent={colors.danger} />
);

export const FallbackCard = (props: CardProps) => (
  <RecommendationCard {...props} icon="✨" label="FOR YOU" accent={colors.muted} />
);
