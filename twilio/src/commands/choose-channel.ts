import { CommandBuilder } from "../core/command-builder";
import { Interaction } from "../core/interaction";
import { log } from "../utils/log";

export default new CommandBuilder()
  .setName("choose-channel")
  .setDescription("Opens channel choosing menu")
  .setHandler(async (interaction: Interaction) => {
    const reply = await interaction.awaitReply();
    log(reply.body);
  });
