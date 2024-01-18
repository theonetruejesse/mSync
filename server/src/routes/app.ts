import { router } from "../trpc";
import { discordRouter } from "./discord/discord";
import { twilioRouter } from "./twilio/twilio"

export const appRouter = router({
  discord: discordRouter,
  twilio: twilioRouter
});