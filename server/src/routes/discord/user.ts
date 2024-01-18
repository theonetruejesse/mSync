import { router, discordProcedure } from "../../trpc";
import { z } from "zod";
import { Log } from "../../utils/log";
import { $z } from "src/zod";

const log = new Log(__filename);

export const userRouter = router({
  create: discordProcedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string().optional()
    }))
    .output(z.discriminatedUnion("success", [
      z.object({
        data: $z.user,
        success: z.literal(true)
      }),
      z.object({
        error: z.string(),
        success: z.literal(false)
      })
    ]))
    .mutation(async ({ input, ctx }) => {
      const { resolvers } = ctx;
      const { firstName, lastName } = input;

      try {
        return {
          data: await resolvers.user.create(firstName, lastName),
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
        await await resolvers.user.delete(ids);
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