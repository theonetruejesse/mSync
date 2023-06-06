import { Event } from "../structures/Event";

export default new Event("messageCreate", (message) => {
  const channelId = message.channelId;
  const authorId = message.author.id;
  console.log(channelId);
  console.log(authorId);
});
