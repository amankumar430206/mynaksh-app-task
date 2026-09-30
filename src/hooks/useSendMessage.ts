import { fetchAiReply, sendMessage } from '../api/conversationApi';
import { useConversationStore } from '../store/conversationStore';
import { Message } from '../types/conversation';

export const useSendMessage = () => {
  const addMessage = useConversationStore(state => state.addMessage);
  const setReply = useConversationStore(state => state.setReply);
  const setAiTyping = useConversationStore(state => state.setAiTyping);
  const updateMessageStatus = useConversationStore(
    state => state.updateMessageStatus,
  );

  const receiveAiReply = async () => {
    setAiTyping(true);
    try {
      const reply = await fetchAiReply();
      addMessage({
        id: `ai-${Date.now()}`,
        type: 'ai',
        createdAt: Date.now(),
        animate: true,
        ...reply,
      });
    } finally {
      setAiTyping(false);
    }
  };

  const deliver = async (message: Message) => {
    updateMessageStatus(message.id, 'sending');
    try {
      await sendMessage(message.text);
      updateMessageStatus(message.id, 'sent');
    } catch {
      updateMessageStatus(message.id, 'failed');
      return;
    }
    receiveAiReply();
  };

  const send = (text: string) => {
    const { replyingTo } = useConversationStore.getState();
    const message: Message = {
      id: `local-${Date.now()}`,
      type: 'user',
      text,
      createdAt: Date.now(),
      status: 'sending',
      animate: true,
      replyTo: replyingTo
        ? { id: replyingTo.id, text: replyingTo.text }
        : undefined,
    };
    addMessage(message);
    setReply(null);
    deliver(message);
  };

  const retry = (id: string) => {
    const message = useConversationStore
      .getState()
      .messages.find(m => m.id === id);
    if (message) {
      deliver(message);
    }
  };

  return { send, retry };
};
