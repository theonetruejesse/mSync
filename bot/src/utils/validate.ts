export function validateName(name: string) {
  return /^\w+$/.test(name);
}

export function validatePhoneNumber(phoneNumber: string) {
  return /^1?\d{10}$/.test(phoneNumber);
}
