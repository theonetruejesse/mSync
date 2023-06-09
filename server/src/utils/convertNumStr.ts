// thanks stackoverflow!
const isNumeric = (num: string) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);

export const convertNumStr = (num: string): number | undefined => {
  return isNumeric(num) ? parseInt(num) : undefined;
};
