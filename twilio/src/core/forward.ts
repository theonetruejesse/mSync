import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { IncomingMessage } from "../types/twilio";
import { isIncomingMessage } from "../utils/validation";
import { trpc } from "./trpc";
import { log } from "../utils/log";

export class Forward {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.post("/message", (req, res) => {
      const incomingMessage: IncomingMessage = req.body;
      if (isIncomingMessage(incomingMessage)) {
        trpc.message.mutate({
          message: incomingMessage.Body,
          to: incomingMessage.To,
          from: incomingMessage.From
        });
        res.sendStatus(200);
      } else {
        res.sendStatus(422);
      }
    });
    this.app.listen(process.env.PORT, () => {
      log("Forwarding messages");
    });
  }
}
