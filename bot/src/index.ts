import "dotenv-safe/config";
import { DiscordClient } from "../structures/Client";

export const client = new DiscordClient();

const main = async () => {
  client.start();
};

main()
  .then(async () => {
    console.log("Done!");
  })
  .catch(async (err) => {
    console.log(err);
  });
