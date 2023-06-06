import { Command } from "../structures/Command";

export default new Command({
  name: "ping",
  description: "replies with pong 2",
  run: async ({ interaction }) => {
    interaction.followUp("pong");
  },
});
