import "dotenv-safe/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

// import { smsEndpoints } from "./sms/endpoints";
import messageRoute from "./routes/message";

export const prisma = new PrismaClient();
export const app = express();

const main = async () => {
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
