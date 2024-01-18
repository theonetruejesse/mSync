import { Event } from "../core/Event";

export default new Event("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.webhookId) return;

  // await sendMessage({
  //   userId: message.author.id,
  //   channelId: message.channelId,
  //   message: message.content,
  // }); // see mSync/server/src/types/sendInput
});
