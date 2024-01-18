import { config } from "dotenv-safe";
config();

import { createContext } from "./core/context";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "./core/trpc";
import { discordRouter } from "./discord/router";
import { twilioRouter } from "./twilio/router";
import cors from "cors";

const appRouter = router({
  discord: discordRouter,
  twilio: twilioRouter
});

createHTTPServer({
  router: appRouter,
  middleware: cors(),
  createContext
}).listen(process.env.PORT);

export type AppRouter = typeof appRouter;
