// todo, determine consistent style for numbers
export const formatNumber = (str: string) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
};
