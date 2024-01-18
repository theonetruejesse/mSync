import { router, discordProcedure } from "../../trpc";
import { z } from "zod";
import { Log } from "../../utils/log";
import { $z } from "../../zod";

const log = new Log(__filename);

export const platformRouter = router({
  create: discordProcedure
    .input(z.object({
      name: z.string()
    }))
    .output(z.discriminatedUnion("success", [
      z.object({
        data: $z.platform,
        success: z.literal(true)
      }),
      z.object({
        error: z.string(),
        success: z.literal(false)
      })
    ]))
    .mutation(async ({ input, ctx }) => {
      const { resolvers } = ctx;
      const { name } = input;

      try {
        return {
          data: await resolvers.platform.create(name),
          success: true
        };
      } catch (e) {
        log.logUnknownError(e);
        return {
          error: `Unknown error (see \`${log.logPath}\` for details)`,
          success: false
        }
      }
    }),
  delete: discordProcedure
    .input(z.object({
      ids: z.number().array()
    }))
    .output(z.discriminatedUnion("success", [
      z.object({
        success: z.literal(true)
      }),
      z.object({
        error: z.string(),
        success: z.literal(false)
      })
    ]))
    .mutation(async ({ input, ctx }) => {
      const { resolvers } = ctx;
      const { ids } = input;

      try {
        await resolvers.platform.delete(ids);
        return {
          success: true
        };
      } catch (e) {
        log.logUnknownError(e);
        return {
          error: `Unknown error (see \`${log.logPath}\` for details)`,
          success: false
        }
      }
    })
});