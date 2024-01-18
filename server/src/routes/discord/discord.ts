import { router, discordProcedure } from "../../trpc";
import { channelRouter } from "./channel";
import { contactRouter } from "./contact";
import { platformRouter } from "./platform";
import { roleRouter } from "./role";
import { userRouter } from "./user";

export const discordRouter = router({
  ping: discordProcedure
    .query(() => {
      return "Pong! (via tRPC)";
    }),
  channel: channelRouter,
  contact: contactRouter,
  platform: platformRouter,
  role: roleRouter,
  user: userRouter
});