import { config } from "dotenv-safe";
import { createContext } from "./core/context";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "./core/trpc";
import { discordRouter } from "./discord/router";
import { twilioRouter } from "./twilio/router";

config();

const appRouter = router({
  discord: discordRouter,
  twilio: twilioRouter
});

createHTTPServer({
  router: appRouter,
  createContext
}).listen(process.env.PORT);

export type AppRouter = typeof appRouter;
