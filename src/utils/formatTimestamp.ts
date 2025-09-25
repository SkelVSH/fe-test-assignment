export const formatTimestamp = (timestamp: number | string) => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
};
