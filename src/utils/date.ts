export const formatHabitDate = (dateString: string): string => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return formatter.format(date);
};

export const getToday = (): string => {
  return new Date().toISOString().split("T")[0];
};