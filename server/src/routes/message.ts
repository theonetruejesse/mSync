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

// create user, firstName required, lastName optional
router.post("/user", async (req, res) => {
  const user = formatUserCreateInput(req.body);
  if (!user) res.send("Invalid request for UserCreateInput");
  else res.send(await createUser(user));
});

// create user, firstName required, lastName optional
router.post("/participant", async (req, res) => {
  const participant = formatParticipantCreateInput(req.body);
  if (!participant) res.send("Invalid request for ParticipantCreateInput");
  else res.send(await createParticipant(participant));
});

// resolve message request coming from some channel
router.post("/send", async (req, res) => {
  const sending = formatSendInput(req.body);
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
    if (participant != sender) await sendMessage(participant, message);
  });

  return res.send("Message sent!");
});

export default router;
