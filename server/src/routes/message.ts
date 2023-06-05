import express from "express";
import { prisma } from "..";

const router = express.Router();

// gets all users based on a channel
router.get("/channels/:channelId", async (req, res) => {
  const channelId = parseInt(req.params.channelId);
  const users = await prisma.user.findMany({
    where: { id: { equals: channelId } },
  });
  res.send(users);
});

// gets all users, filtered by id?, number?, and username?
router.get("/users", async (req, res) => {
  const filter: any = {};
  if (req.query.id) filter["id"] = parseInt(req.query.id as string);
  if (req.query.number) filter["phoneNumber"] = req.query.number;
  if (req.query.username) filter["discordName"] = req.query.username;

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

  // there's definitely a smarter way to do this, but type safety am i right??
  const lastName = req.body.lastName
    ? (req.body.lastName as string)
    : undefined;
  const phoneNumber = req.body.phoneNumber
    ? (req.body.phoneNumber as string)
    : undefined;
  const discordName = req.body.discordName
    ? (req.body.discordName as string)
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
      discordName,
      roleId,
    },
  });

  res.send(user);
});

export default router;
