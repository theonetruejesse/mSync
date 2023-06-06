import { Command } from "../structures/Command";

export default new Command({
  name: "create-user",
  description: "adds a user into the mSync system",
  run: async ({ interaction }) => {
    interaction.followUp("todo");
  },
});
