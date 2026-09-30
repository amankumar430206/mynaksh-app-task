import { useConversationStore } from '../store/conversationStore';

export const useFeedback = (messageId: string) => {
  const feedback = useConversationStore(state => state.feedback[messageId]);
  const setFeedback = useConversationStore(state => state.setFeedback);

  return {
    feedback,
    like: () => setFeedback(messageId, 'like'),
    dislike: () => setFeedback(messageId, 'dislike'),
    selectReason: (reason: string) => setFeedback(messageId, 'dislike', reason),
  };
};
