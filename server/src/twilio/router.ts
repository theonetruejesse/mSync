import { router, twilioProcedure } from "../core/trpc";
import { z } from "zod";
import { $z } from "./utils/zod";
import { RenderDraftBuilder, render } from "./utils/render";

export const twilioRouter = router({
  message: twilioProcedure
    .input(
      z.object({
        contact: z.string(),
        message: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, send } = ctx;
      const { contact, message } = input;
      const channelResult = await prisma.contact.findUnique({
        where: {
          contact
        },
        select: {
          channel: true
        }
      });
      if (!channelResult) return;
      const { channel } = channelResult;
      if (!channel) return;
      const senderResult = await prisma.contact.findFirst({
        where: {
          contact
        },
        select: {
          user: {
            select: {
              memberships: {
                where: {
                  channelId: channel.id
                }
              }
            }
          }
        }
      });
      if (!senderResult) return;
      const [sender] = senderResult.user.memberships;
      for (const platform in send) {
        if (platform != "twilio") {
          send[platform](message, sender, channel);
        }
      }
    }),
  test: twilioProcedure
    .input(z.lazy(() => $z.render.renderInput()))
    .output(z.lazy(() => $z.render.renderOutput()))
    .mutation(({ input }) => {
      return render((input) => {
        if (input.options.length == 0) {
          return new RenderDraftBuilder()
            .setContent("Pick some fruits")
            .addOptions("Apple", "Orange", "Banana");
        }
        if (input.options.length == 1) {
          return new RenderDraftBuilder()
            .setContent("Choose a color")
            .addOptions("Orange", "Blue", "Magenta");
        }
        return new RenderDraftBuilder()
          .setContent("Good choice!")
          .setResolved(true);
      }, input);
    })
});
