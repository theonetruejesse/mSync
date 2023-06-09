import express from "express";
import {
  getUsers,
  getParticipants,
  createUser,
  createParticipant,
  getParticipant,
  getUser,
  getRole,
} from "../resolvers";
import { convertNumStr } from "../utils/convertNumStr";
import {
  formatMessage,
  formatParticipantCreateInput,
  formatSendInput,
  formatUserCreateInput,
  formatUserWhereInput,
} from "../utils/format";
import { sendMessage } from "../utils/sendMessage";

const router = express.Router();

// gets all participants based on a channel
router.get("participants/:channelId", async (req, res) => {
  res.send(await getParticipants({ channelId: req.body.channelId }));
});

router.get("/users", async (req, res) => {
  const query = formatUserWhereInput(req.query);
  res.send(await getUsers(query));
});

router.get("/users/:userId", async (req, res) => {
  res.send(await getUsers({ id: convertNumStr(req.body.userId) }));
});

// firstName required, lastName optional
router.post("/user", async (req, res) => {
  const user = formatUserCreateInput(req.body);
  if (!user) res.send("Invalid request for UserCreateInput");
  else res.send(await createUser(user));
});

// everything required
router.post("/participant", async (req, res) => {
  const participant = formatParticipantCreateInput(req.body);
  if (!participant) res.send("Invalid request for ParticipantCreateInput");
  else res.send(await createParticipant(participant));
});

// set up (specifically for testing sms endpoint):
// Run server (yarn watch + dev)
// Create online endpoint (cd ~ && ./ngrok http 4000)
// Set <ngrok-url.app>/message/send/1 as url message webhook on twilio

// resolve message request coming from some platform
router.post("/send/:platformId", async (req, res) => {
  const sending = formatSendInput({
    ...req.body,
    platformId: req.params.platformId,
  });
  if (!sending) return res.send("Invalid request for SendInput");
  const sender = await getParticipant({
    messagingId: sending.messagingId,
    channelId: sending.channelId,
  });
  if (!sender) return res.send("Invalid request for participant");

  const user = await getUser({ id: sender.userId });
  if (!user) return res.send("Invalid request for user");

  const role = await getRole({ id: sender.roleId });
  if (!role) return res.send("Invalid request for role");

  const message = formatMessage(user, role, sending.message);
  const channel = await getParticipants({ channelId: sender.channelId });

  channel.forEach(async (participant) => {
    if (participant.messagingId != sender.messagingId)
      await sendMessage(participant, message);
  });

  return res.send("Message sent!");
});

export default router;
