import { Message } from '../../types/conversation';

export type MessageProps = {
  message: Message;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
};
