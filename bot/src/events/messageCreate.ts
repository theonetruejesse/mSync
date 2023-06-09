import { sendMessage } from "../requests/message";
import { Event } from "../structures/Event";

// todo, migrate to tRPC lmao
export default new Event("messageCreate", async (message) => {
  if (message.author.bot) return;
  // console.log(message); //

  await sendMessage({
    messagingId: message.author.id,
    channelId: message.channelId,
    message: message.content,
  }); // see mSync/server/src/types/sendInput
});
