// import { app } from "..";
// import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
// import { formatNumber } from "./utils/formatNumber";
// import { sendText } from "./sendText";
// import bodyParser from "body-parser";
// import { TextChannel } from "discord.js";

// set up:
// Run server (yarn watch + dev)
// Create online endpoint (cd ~ && ./ngrok http 4000)
// Set <ngrok-url.io>/recieve as url message webhook on twilio

// export const smsEndpoints = () => {
//   app.use(bodyParser.urlencoded({ extended: false }));

//   app.get("/send", (req, res) => {
//     const message = req.query.message;
//     if (!message) {
//       res.send("No message in query!");
//     } else {
//       const reciever: string = process.env.PERSONAL_NUMBER;
//       // formatNumber("(925) 487-3772")!; // todo, not gud lol
//       sendText({
//         message: message as string,
//         reciever,
//       });
//       res.send(`Sent to ${reciever}: \n${message}`);
//     }
//   });

// app.post("/recieve", async (req, res) => {
//   const twilioRes = await req.body;
//   // todo -> based on phone number, get back channel
//   // todo -> database query stuff
//   const channel = await client.channels.fetch(
//     process.env.DISCORD_BOT_CHANNEL_ID
//   );
//   if (channel) {
//     (channel as TextChannel).send(req.body.Body);
//     console.log("sent!");
//   } else {
//     const twiml = new MessagingResponse();
//     // twiml.message(`You sent "${twilioRes.Body}" to ${twilioRes.To}.`);
//     twiml.message("Text did not go through.");
//     // todo -> MMS
//     res.type("text/xml").send(twiml.toString());
//   }
// });
// };
