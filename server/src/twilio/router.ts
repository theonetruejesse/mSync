import { router, twilioProcedure } from "../core/trpc";
import { z } from "zod";

export const twilioRouter = router({
  message: twilioProcedure
    .input(
      z.object({
        to: z.string(),
        from: z.string(),
        message: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { send, prisma } = ctx;
      const { to, from, message } = input;
      const proxy = await prisma.proxy.findUnique({
        where: {
          contact: to
        }
      });
      if (!proxy) return;
      const user = await prisma.clientContact
        .findUnique({
          where: {
            contact: from
          },
          include: {
            user: true
          }
        })
        .then((contact) => contact?.user);
      if (!user) return;
      const sender = await prisma.clientMembership.findUnique({
        where: {
          channelType_userId: {
            channelType: proxy.type,
            userId: user.id
          }
        },
        include: {
          channel: true,
          user: true
        }
      });
      if (!sender) return;
      const { channel } = sender;
      for (const platform in send)
        if (platform != "twilio") send[platform](message, sender, channel);
    })
});
