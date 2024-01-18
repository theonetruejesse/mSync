import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { ChannelResolver } from "./resolvers/channel";
import { ContactResolver } from "./resolvers/contact";
import { PlatformResolver } from "./resolvers/platform";
import { RoleResolver } from "./resolvers/role";
import { UserResolver } from "./resolvers/user";

const t = initTRPC.context<Context>().create();

// In the future, it would be good to verify all requests coming through
// `discordRouter` or `twilioRouter`
const discordMiddleware = t.middleware(({ next, ctx }) => {
  const { prisma } = ctx;

  return next({
    ctx: {
      ...ctx,
      resolvers: {
        channel: new ChannelResolver(prisma),
        contact: new ContactResolver(prisma),
        platform: new PlatformResolver(prisma),
        role: new RoleResolver(prisma),
        user: new UserResolver(prisma)
      }
    }
  });
});

const twilioMiddleware = t.middleware(({ next, ctx }) => {
  return next({
    ctx
  });
});

export const router = t.router;
export const discordProcedure = t.procedure.use(discordMiddleware);
export const twilioProcedure = t.procedure.use(twilioMiddleware);