export type MessageType = 'system' | 'user' | 'ai' | 'human';

export type MessageStatus = 'sending' | 'sent' | 'failed';

export type RecommendationType =
  | 'gemstone'
  | 'tarot'
  | 'consultation'
  | 'article'
  | 'promotion';

export type Recommendation = {
  id: string;
  type: RecommendationType;
  title: string;
  subtitle?: string;
};

export type ReplyRef = {
  id: string;
  text: string;
};

export type Message = {
  id: string;
  type: MessageType;
  text: string;
  createdAt: number;
  recommendations?: Recommendation[];
  status?: MessageStatus;
  replyTo?: ReplyRef;
  animate?: boolean;
};

export type FeedbackValue = 'like' | 'dislike';

export type Feedback = {
  value: FeedbackValue;
  reason?: string;
};

export type LoadStatus = 'idle' | 'loading' | 'error' | 'ready';

export type TimelineRow =
  | { kind: 'date'; key: string; label: string }
  | {
      kind: 'message';
      key: string;
      message: Message;
      isFirstInGroup: boolean;
      isLastInGroup: boolean;
    };
