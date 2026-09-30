import { useConversationStore } from '../store/conversationStore';
import { useLoadConversation } from './useLoadConversation';
import { useSendMessage } from './useSendMessage';

export const useConversation = () => {
  const messages = useConversationStore(state => state.messages);
  const aiTyping = useConversationStore(state => state.aiTyping);
  const { status, reload } = useLoadConversation();
  const { send } = useSendMessage();

  return { status, messages, aiTyping, reload, send };
};
