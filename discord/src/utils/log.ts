export function log(...args: any[]) {
  process.stdout.write("Discord: ");
  console.log(...args);
}
