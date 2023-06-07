import "dotenv-safe/config";
import express from "express";
import { DiscordClient } from "./structures/Client";
import receiveRoute from "./requests/recieve";
import bodyParser from "body-parser";

export const client = new DiscordClient();
export const app = express();

const main = async () => {
  client.start();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/", receiveRoute);

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`\nlistening to port ${process.env.PORT}\n`);
  });
};

main().catch(async (err) => {
  console.log(err);
});
