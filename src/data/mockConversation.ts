import { Message } from '../types/conversation';

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

export const mockConversation: Message[] = [
  {
    id: '1',
    type: 'system',
    text: 'Your session with AI Astrologer has started.',
    createdAt: now - DAY,
  },
  {
    id: '2',
    type: 'user',
    text: 'Can you tell me about my career this year?',
    createdAt: now - DAY + 60000,
  },
  {
    id: '3',
    type: 'ai',
    text: 'I can already see a strong Saturn influence in your chart. Based on this, here are a few recommendations that may help you.',
    createdAt: now - 120000,
    recommendations: [
      {
        id: '1',
        type: 'gemstone',
        title: 'Blue Sapphire',
        subtitle: 'Recommended for Saturn',
      },
      { id: '2', type: 'tarot', title: 'Career Tarot Reading' },
      { id: '3', type: 'consultation', title: 'Talk to an Astrologer' },
      { id: '4', type: 'article', title: 'Understanding Saturn Mahadasha' },
    ],
  },
  {
    id: '4',
    type: 'human',
    text: 'I also recommend focusing on your upcoming Jupiter transit.',
    createdAt: now - 60000,
  },
];
