import { create } from 'zustand';
import {
  Feedback,
  FeedbackValue,
  LoadStatus,
  Message,
  MessageStatus,
} from '../types/conversation';

type ConversationState = {
  messages: Message[];
  status: LoadStatus;
  replyingTo: Message | null;
  aiTyping: boolean;
  feedback: Record<string, Feedback>;
  setAiTyping: (typing: boolean) => void;
  setMessages: (messages: Message[]) => void;
  setStatus: (status: LoadStatus) => void;
  addMessage: (message: Message) => void;
  updateMessageStatus: (id: string, status: MessageStatus) => void;
  remove: (id: string) => void;
  setReply: (message: Message | null) => void;
  setFeedback: (id: string, value: FeedbackValue, reason?: string) => void;
};

export const useConversationStore = create<ConversationState>(set => ({
  messages: [],
  status: 'idle',
  replyingTo: null,
  aiTyping: false,
  feedback: {},

  setAiTyping: aiTyping => set({ aiTyping }),

  setMessages: messages => set({ messages }),

  setStatus: status => set({ status }),

  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),

  updateMessageStatus: (id, status) =>
    set(state => ({
      messages: state.messages.map(m => (m.id === id ? { ...m, status } : m)),
    })),

  remove: id =>
    set(state => ({
      messages: state.messages.filter(m => m.id !== id),
      replyingTo: state.replyingTo?.id === id ? null : state.replyingTo,
    })),

  setReply: message => set({ replyingTo: message }),

  setFeedback: (id, value, reason) =>
    set(state => {
      const current = state.feedback[id];
      const sameChoice = current?.value === value && current.reason === reason;
      const next = { ...state.feedback };
      if (sameChoice) {
        delete next[id];
      } else {
        next[id] = { value, reason };
      }
      return { feedback: next };
    }),
}));
