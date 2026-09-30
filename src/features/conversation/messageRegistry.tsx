import React from 'react';
import { MessageType } from '../../types/conversation';
import ChatMessage, { VARIANTS } from './ChatMessage';
import SystemMessage from './SystemMessage';
import { MessageProps } from './types';

// To add a new message type: add it to MessageType and register a renderer here.
export const messageRenderers: Record<
  MessageType,
  React.ComponentType<MessageProps>
> = {
  system: SystemMessage,
  user: props => <ChatMessage {...props} variant={VARIANTS.user} />,
  ai: props => <ChatMessage {...props} variant={VARIANTS.ai} />,
  human: props => <ChatMessage {...props} variant={VARIANTS.human} />,
};
