const DAY = 24 * 60 * 60 * 1000;

const startOfDay = (ts: number) => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const isSameDay = (a: number, b: number) => startOfDay(a) === startOfDay(b);

export const formatDateLabel = (ts: number) => {
  const diff = startOfDay(Date.now()) - startOfDay(ts);
  if (diff === 0) {
    return 'Today';
  }
  if (diff === DAY) {
    return 'Yesterday';
  }
  return new Date(ts).toDateString();
};
