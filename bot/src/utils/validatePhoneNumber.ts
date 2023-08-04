export function validatePhoneNumber(phoneNumber: string) {
  return /^\d+$/.test(phoneNumber);
}
