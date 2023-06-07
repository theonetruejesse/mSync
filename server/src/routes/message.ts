import express from "express";
import { prisma } from "..";
import { SendMessage, sendText } from "../sms/sendText";

const router = express.Router();

// gets all users based on a channel
router.get("/channels/:channelId", async (req, res) => {
  const channelId = req.params.channelId;
  const users = await prisma.user.findMany({
    where: { channelId: { equals: channelId } },
  });
  res.send(users);
});

// gets all users, filtered by id?, number?, and username?
router.get("/users", async (req, res) => {
  const filter: any = {};
  if (req.query.userId) filter["id"] = parseInt(req.query.id as string);
  if (req.query.phoneNumber) filter["phoneNumber"] = req.query.phoneNumber;
  if (req.query.discordId) filter["discordId"] = req.query.discordId;

  const users = await prisma.user.findMany({ where: filter });

  res.send(users);
});

// gets user based on id, throw error if no user exists
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await prisma.user.findFirstOrThrow({
      where: { id: { equals: userId } },
    });
    res.send(user);
  } catch (e) {
    res.send("This user does not exist");
  }
});

// create user, first name and channel id required, everything else optional
router.post("/user", async (req, res) => {
  const firstName = req.body.firstName as string;
  const channelId = req.body.channelId as string;
  if (!firstName || !channelId)
    res.send("invalid, need firstName and channelId");

  // todo, define type definitions for entire project
  const lastName = req.body.lastName
    ? (req.body.lastName as string)
    : undefined;
  const phoneNumber = req.body.phoneNumber
    ? (req.body.phoneNumber as string)
    : undefined;
  const discordId = req.body.discordId
    ? (req.body.discordId as string)
    : undefined;
  const roleId = req.body.roleId
    ? parseInt(req.body.roleId as string)
    : undefined;

  const user = await prisma.user.create({
    data: {
      firstName,
      channelId,
      lastName,
      phoneNumber,
      discordId,
      roleId,
    },
  });

  res.send(user);
});

// gets role based on id, return empty string if none exists
// todo, would more efficent to just combine the call with get user, specify in typings
router.get("/roles/:roleId", async (req, res) => {
  try {
    const roleId = parseInt(req.params.roleId);
    const user = await prisma.role.findFirstOrThrow({
      where: { id: { equals: roleId } },
    });
    res.send(user);
  } catch (e) {
    res.send("This role does not exist");
  }
});

// send text to given number
router.post("/send", async (req, res) => {
  const sent = await sendText(req.body as SendMessage);
  res.send(sent.body);
});

export default router;
