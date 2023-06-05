import "dotenv-safe/config";
import express from "express";
import { DiscordClient } from "./bot/structures/Client";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

// import { smsEndpoints } from "./sms/endpoints";
import messageRoute from "./routes/message";

export const client = new DiscordClient();
export const prisma = new PrismaClient();
export const app = express();

const main = async () => {
  client.start();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/message", messageRoute);

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`\nlistening to port ${process.env.PORT}\n`);
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    await prisma.$disconnect();
    console.log(err);
  });
