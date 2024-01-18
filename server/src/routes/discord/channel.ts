import { Prisma } from "@prisma/client";
import { router, discordProcedure } from "../../trpc";
import { z } from "zod";
import { Log } from "../../utils/log";
import { $z } from "../../zod";

const log = new Log(__filename);

export const channelRouter = router({
  create: discordProcedure
    .input(z.object({
      discordId: z.string(),
      name: z.string()
    }))
    .output(z.discriminatedUnion("success", [
      z.object({
        data: $z.channel,
        success: z.literal(true)
      }),
      z.object({
        error: z.string(),
        success: z.literal(false)
      })
    ]))
    .mutation(async ({ input, ctx }) => {
      const { resolvers } = ctx;
      const { discordId, name } = input;

      try {
        return {
          data: await resolvers.channel.create(discordId, name),
          success: true
        };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code == "P2002") {
            return {
              error: `Channel \`${name}\` already exists!`,
              success: false
            };
          }
        }
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
        await resolvers.channel.delete(ids);
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
    }),
  getAll: discordProcedure
    .output(z.discriminatedUnion("success", [
      z.object({
        data: $z.channel.array(),
        success: z.literal(true)
      }),
      z.object({
        error: z.string(),
        success: z.literal(false)
      })
    ]))
    .query(async ({ ctx }) => {
      const { resolvers } = ctx;

      try {
        return {
          data: await resolvers.channel.getAll(),
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
  // add: discordProcedure
  //   .input(z.object({
  //     channelId: z.number(),
  //     userIds: z.number().array()
  //   }))
  //   .output(z.discriminatedUnion("success", [
  //     z.object({
  //       data: z.any(),
  //       success: z.literal(true)
  //     }),
  //     z.object({
  //       error: z.string(),
  //       success: z.literal(false)
  //     })
  //   ]))
  //   .mutation(async ({ input, ctx }) => {
  //     return {
  //       error: "Not implemented yet",
  //       success: false
  //     }
  //   })
});