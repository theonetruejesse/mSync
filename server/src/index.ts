import "dotenv-safe/config";
import express from "express";
import { ExtendedClient } from "./bot/structures/Client";

export const client = new ExtendedClient();

const main = async () => {
  client.start();
  const app = express();

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`\nlistening to port ${process.env.PORT}\n`);
  });
};
main().catch((err) => console.log(err));
