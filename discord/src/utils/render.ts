import { ChatInputCommandInteraction, ComponentType } from "discord.js";
import {
  RenderInput,
  RenderOutput
} from "../../../server/dist/discord/types/render";

export async function render(
  interaction: ChatInputCommandInteraction,
  route: (input: RenderInput) => Promise<RenderOutput>,
  input: RenderInput = {},
  options: {} = { time: 60_000 }
) {
  return new Promise(async (resolve) => {
    let message = await route(input);
    const collector = (
      interaction.deferred
        ? await interaction.editReply(message)
        : await interaction.reply(message)
    ).createMessageComponentCollector(options);
    collector.on("collect", async (i) => {
      if (i.isStringSelectMenu()) {
        input[i.customId] = {
          values: i.values,
          type: ComponentType.StringSelect
        };
      }
      if (i.isButton()) {
        input[i.customId] = {
          value: true,
          type: ComponentType.Button
        };
      }
      message = await route(input);
      if (message.resolved) {
        collector.stop();
        resolve(null);
      } else {
        i.update(message);
      }
    });
  });
}
