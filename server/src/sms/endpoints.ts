import { app } from "..";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { formatNumber } from "./helpers/formatNumber";
import { sendText } from "./sendText";
import bodyParser from "body-parser";

// set up:
// Run server (yarn watch + dev)
// Create online endpoint (cd ~ && ./ngrok http 4000)
// Set <ngrok-url.io>/recieve as url message webhook on twilio

export const smsEndpoints = () => {
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/send", (req, res) => {
    const message = req.query.message;
    if (!message) {
      res.send("No message in query!");
    } else {
      const reciever = formatNumber("(925) 487-3772")!;
      sendText({
        message: message as string,
        reciever,
      });
      res.send(`Sent to ${reciever}: \n${message}`);
    }
  });

  app.post("/recieve", async (req, res) => {
    const twilioResponse = await req.body;

    const twiml = new MessagingResponse();
    twiml.message(`You sent "${twilioResponse.Body}" to ${twilioResponse.To}.`);
    // todo -> MMS
    res.type("text/xml").send(twiml.toString());
  });
};
