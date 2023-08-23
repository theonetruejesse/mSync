export function log(...args: any[]) {
  process.stdout.write("Server: ");
  console.log(...args);
}
