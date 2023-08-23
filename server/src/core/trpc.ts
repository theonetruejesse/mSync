import { initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const discordMiddleware = t.middleware(({ next, ctx }) => {
  return next({
    ctx
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
