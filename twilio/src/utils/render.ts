import {
  RenderInput,
  RenderOutput
} from "../../../server/dist/twilio/types/render";
import { Message } from "../core/message";
import { Interaction } from "../core/interaction";

export async function render(
  interaction: Interaction,
  route: (input: RenderInput) => Promise<RenderOutput>,
  input: RenderInput = { options: [] },
  options: { timeout: number } = { timeout: 60_000 }
) {
  return new Promise(async (resolve) => {
    let message = await route(input);
    interaction.reply(message.content);
    let reply: Message;
    do {
      reply = await interaction.awaitReply(options);
      if (reply.body.toLowerCase() == "cancel") {
        reply.reply("Successfully cancelled");
        resolve(null);
        return;
      }
      if (reply.body.toLowerCase() == "back") {
        input.options.pop();
      } else {
        input.options.push(reply.body);
      }
      let message = await route(input);
      reply.reply(message.content);
    } while (!message.resolved);
    resolve(null);
  });
}
