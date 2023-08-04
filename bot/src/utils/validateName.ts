export function validateName(name: string) {
  return /^\w+$/.test(name);
}
