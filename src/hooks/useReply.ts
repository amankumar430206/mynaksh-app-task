import { useConversationStore } from '../store/conversationStore';

export const useReply = () => {
  const replyingTo = useConversationStore(state => state.replyingTo);
  const setReply = useConversationStore(state => state.setReply);

  return { replyingTo, startReply: setReply, cancelReply: () => setReply(null) };
};
