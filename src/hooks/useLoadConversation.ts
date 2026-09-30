import { useCallback, useEffect } from 'react';
import { fetchConversation } from '../api/conversationApi';
import { useConversationStore } from '../store/conversationStore';

export const useLoadConversation = () => {
  const status = useConversationStore(state => state.status);
  const setStatus = useConversationStore(state => state.setStatus);
  const setMessages = useConversationStore(state => state.setMessages);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      setMessages(await fetchConversation());
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [setStatus, setMessages]);

  useEffect(() => {
    load();
  }, [load]);

  return { status, reload: load };
};
