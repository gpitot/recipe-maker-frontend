export const timeIsAfter = (time: string) => {
  return new Date(parseInt(time)) > new Date();
};
