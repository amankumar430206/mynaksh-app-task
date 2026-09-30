import { mockConversation } from '../data/mockConversation';
import { Message } from '../types/conversation';

export type AiReply = Pick<Message, 'text' | 'recommendations'>;

const aiReplies: AiReply[] = [
  {
    text: 'Jupiter is entering a favourable house for you. The next few months look promising for new opportunities.',
    recommendations: [
      { id: 'r1', type: 'tarot', title: 'Opportunity Tarot Reading' },
      { id: 'r2', type: 'gemstone', title: 'Yellow Sapphire', subtitle: 'Recommended for Jupiter' },
      { id: 'r3', type: 'consultation', title: 'Talk to an Astrologer' },
    ],
  },
  {
    text: 'Your chart suggests patience will pay off. Focus on steady progress rather than quick wins.',
    recommendations: [
      { id: 'r4', type: 'article', title: 'Understanding Saturn Mahadasha' },
      { id: 'r5', type: 'promotion', title: 'First consultation free' },
    ],
  },
];

export const apiConfig = {
  loadDelay: 1000,
  sendDelay: 1200,
  replyDelay: 1800,
  failLoad: false,
  sendFailRate: 0.3,
};

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const fetchConversation = async (): Promise<Message[]> => {
  await wait(apiConfig.loadDelay);
  if (apiConfig.failLoad) {
    throw new Error('Unable to load conversation.');
  }
  return mockConversation;
};

export const fetchAiReply = async (): Promise<AiReply> => {
  await wait(apiConfig.replyDelay);
  return aiReplies[Math.floor(Math.random() * aiReplies.length)];
};

export const sendMessage = async (_text: string): Promise<void> => {
  await wait(apiConfig.sendDelay);
  if (Math.random() < apiConfig.sendFailRate) {
    throw new Error('Failed to send message.');
  }
};
