import "dotenv-safe/config";
import express from "express";
import { DiscordClient } from "./bot/structures/Client";
import { PrismaClient } from "@prisma/client";
import { smsEndpoints } from "./sms/endpoints";

export const client = new DiscordClient();
const prisma = new PrismaClient();
export const app = express();

const main = async () => {
  client.start();

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  smsEndpoints();

  app.get("/contacts", async (_, res) => {
    const contacts = await prisma.contact.findMany();
    res.send(contacts);
  });

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
