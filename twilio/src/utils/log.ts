export function log(...args: any[]) {
  process.stdout.write("Twilio: ");
  console.log(...args);
}
