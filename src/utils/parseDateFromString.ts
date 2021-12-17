const parseDateFromString = (date: string): number => {
  return new Date(date).getTime();
};

export { parseDateFromString };
