import { Message, TimelineRow } from '../types/conversation';
import { formatDateLabel, isSameDay } from './date';

const isGrouped = (a: Message | undefined, b: Message | undefined) =>
  !!a &&
  !!b &&
  a.type === b.type &&
  a.type !== 'system' &&
  isSameDay(a.createdAt, b.createdAt);

export const groupMessages = (messages: Message[]): TimelineRow[] => {
  const rows: TimelineRow[] = [];

  messages.forEach((message, index) => {
    const prev = messages[index - 1];
    const next = messages[index + 1];

    if (!prev || !isSameDay(prev.createdAt, message.createdAt)) {
      rows.push({
        kind: 'date',
        key: `date-${message.id}`,
        label: formatDateLabel(message.createdAt),
      });
    }

    rows.push({
      kind: 'message',
      key: message.id,
      message,
      isFirstInGroup: !isGrouped(prev, message),
      isLastInGroup: !isGrouped(message, next),
    });
  });

  return rows;
};
