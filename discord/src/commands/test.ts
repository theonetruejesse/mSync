import { ChatInputCommandInteraction } from "discord.js";
import { CommandBuilder } from "../core/command-builder";
import { render } from "../utils/render";
import { trpc } from "../core/trpc";

export default new CommandBuilder()
  .setName("test")
  .setDescription("Testing menus")
  .setHandler(async (interaction: ChatInputCommandInteraction) => {
    await render(interaction, trpc.render.test.mutate);
  });
