import axios from "axios";
import express from "express";
import { getChannel, getRole, getUser, sendMessage } from "./message";
import { Platform } from "../types/requests";
import { constructMessage } from "../utils/constructMessage";
import { formatNumber } from "../utils/formatNumber";

const router = express.Router();

// set up:
// Run server (yarn watch + dev)
// Create online endpoint (cd ~ && ./ngrok http 3000)
// Set <ngrok-url.app>/recieve as url message webhook on twilio
export const messageChannel = async (channelId: string, content: string) => {
  const options = {
    method: "POST",
    url: `${process.env.DISCORD_API_URL}/channels/${channelId}/messages`,
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
    data: { content },
  };
  const response = await axios.request(options);
  return response.data;
};

// text from SMS endpoint
router.post("/recieve", async (req, res) => {
  // todo, refractor this code with contructMessage to use 1 function
  const senderNumber = formatNumber(req.body.From);

  const sender = await getUser(senderNumber, Platform.SMS);
  const role = await getRole(sender.roleId);

  const newMessage = constructMessage({
    firstName: sender.firstName,
    message: req.body.Body,
    roleName: role.name,
  });

  messageChannel(sender.channelId, newMessage); // send text to discord channel

  const chatMembers = await getChannel(sender.channelId);
  const recieverNumber = formatNumber(req.body.To);

  chatMembers.forEach(async (reciever) => {
    if (
      reciever.phoneNumber &&
      reciever.phoneNumber != sender.phoneNumber &&
      reciever.phoneNumber != recieverNumber // prevents bot from texting self
    ) {
      await sendMessage(reciever.phoneNumber, newMessage);
    }
  });

  res.send(newMessage);
});

export default router;
