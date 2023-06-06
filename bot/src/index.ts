import "dotenv-safe/config";
import { DiscordClient } from "./structures/Client";

export const client = new DiscordClient();

const main = async () => {
  client.start();
};

main().catch(async (err) => {
  console.log(err);
});
