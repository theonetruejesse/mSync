import { CommandBuilder } from "../core/command-builder";
import { Interaction } from "../core/interaction";
import { render } from "../utils/render";
import { trpc } from "../core/trpc";

export default new CommandBuilder()
  .setName("render")
  .setDescription("Tests rendering")
  .setHandler(async (interaction: Interaction) => {
    render(interaction, trpc.test.mutate);
  });
