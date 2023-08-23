export function trimWithDots(string: string, length: number) {
  if (string.length < length) {
    return string;
  } else {
    return string.substring(0, length - 3) + "...";
  }
}

export function formatSend(from: string, content: string) {
  return `${from}: ${content}`;
}

export function formatReply(from: string, content: string, reference: string) {
  return `${from} (replying to \`${trimWithDots(
    reference.trim(),
    30
  )}\`): ${content}`;
}
