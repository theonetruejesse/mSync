// assumes all numbers are from US/Canada
// (123) 456-789 => +1123456789
// todo, fix up; doesn't handle case +1 (123)-456-789
export const formatNumber = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? "+1" + match[1] + match[2] + match[3] : null;
};
