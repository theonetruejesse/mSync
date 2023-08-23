import { router, discordProcedure } from "../core/trpc";
import { z } from "zod";
import { $z } from "./utils/zod";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} from "discord.js";
import { RenderDraftBuilder, render } from "./utils/render";

export const discordRouter = router({
  render: router({
    test: discordProcedure
      .input(z.lazy(() => $z.render.renderInput()))
      .output(z.lazy(() => $z.render.renderOutput()))
      .mutation(({ input }) => {
        return render((input) => {
          const rv = new RenderDraftBuilder();
          if (input.hasOwnProperty("finished")) {
            rv.setContent("Good choice!");
          } else {
            rv.setContent("Pick some fruits and a color").setComponents(
              new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                  .setPlaceholder("Pick a fruit")
                  .setCustomId("fruit")
                  .setMinValues(1)
                  .setMaxValues(3)
                  .addOptions(
                    new StringSelectMenuOptionBuilder()
                      .setLabel("Apple")
                      .setValue("apple"),
                    new StringSelectMenuOptionBuilder()
                      .setLabel("Orange")
                      .setValue("orange"),
                    new StringSelectMenuOptionBuilder()
                      .setLabel("Banana")
                      .setValue("banana")
                  )
              ),
              new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                  .setPlaceholder("Pick a color")
                  .setCustomId("color")
                  .addOptions(
                    new StringSelectMenuOptionBuilder()
                      .setLabel("Orange")
                      .setValue("orange"),
                    new StringSelectMenuOptionBuilder()
                      .setLabel("Blue")
                      .setValue("blue"),
                    new StringSelectMenuOptionBuilder()
                      .setLabel("Magenta")
                      .setValue("magenta")
                  )
                  .setDisabled(!input.hasOwnProperty("fruit"))
              ),
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                  .setLabel("Finished")
                  .setStyle(ButtonStyle.Primary)
                  .setCustomId("finished")
                  .setDisabled(
                    !input.hasOwnProperty("fruit") ||
                      !input.hasOwnProperty("color")
                  )
              )
            );
          }
          return rv;
        }, input);
      })
  })
  // message: discordProcedure
  //   .input(
  //     z.object({
  //       discordId: z.string(),
  //       content: z.string()
  //     })
  //   )
  //   .mutation(({ ctx, input }) => {

  //   })
});
