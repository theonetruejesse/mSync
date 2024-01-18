import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { ExtendedSlashCommandBuilder } from "../core/ExtendedSlashCommandBuilder";
import { trpc } from "../trpc";

export default new ExtendedSlashCommandBuilder()
  .setName("channel-delete")
  .setDescription("Open channel delete menu")
  .setHandler(async interaction => {
    await interaction.deferReply();

    const { guild } = interaction;
    if (!guild) return;

    const dbChannelsResponse = await trpc.discord.channel.getAll.query();
    if (!dbChannelsResponse.success) {
      await interaction.editReply("Failed to get all channels: " + dbChannelsResponse.error);
      return;
    }
    const dbChannels = dbChannelsResponse.data;

    if (dbChannels.length == 0) {
      await interaction.editReply("No channels to delete");
      return;
    }

    let ids: number[] = [];
    function buildComponents() {
      return [
        new ActionRowBuilder<StringSelectMenuBuilder>()
          .setComponents(new StringSelectMenuBuilder()
            .setPlaceholder("Select a channel")
            .setCustomId("select")
            .setMinValues(1)
            .setMaxValues(dbChannels.length)
            .addOptions(dbChannels.map(dbChannel => new StringSelectMenuOptionBuilder()
              .setLabel(dbChannel.name)
              .setValue(dbChannel.id.toString())
              .setDefault(ids.includes(dbChannel.id))))),
        new ActionRowBuilder<ButtonBuilder>()
          .setComponents(
            ...(ids.length > 0
              ? [new ButtonBuilder()
                  .setLabel("Confirm")
                  .setCustomId("confirm")
                  .setStyle(ButtonStyle.Primary)]
              : []),
            new ButtonBuilder()
              .setLabel("Cancel")
              .setCustomId("cancel")
              .setStyle(ButtonStyle.Danger)
          )
      ];
    }

    (await interaction.editReply({
      content: "Select channel(s) to delete",
      components: buildComponents()
    })).createMessageComponentCollector({
      time: 60_000
    }).on("collect", async subInteraction => {
      if (subInteraction.customId == "select") {
        ids = (subInteraction as StringSelectMenuInteraction).values.map(value => parseInt(value));
        await subInteraction.update({
          components: buildComponents()
        });
      }
      if (subInteraction.customId == "confirm") {
        await subInteraction.deferUpdate();

        const messages: string[] = [];
        for (const id of ids) {
          messages.push(await (async () => {
            const dbChannel = dbChannels.find(dbChannel => dbChannel.id == id);
            if (!dbChannel) return `Failed to delete channel: Channel with \`id\` '${id}' does not exist`;
  
            const dbDeleteResponse = await trpc.discord.channel.deleteById.mutate({ id });
            if (!dbDeleteResponse.success) {
              return `Failed to delete channel '${dbChannel.name}': ` + dbDeleteResponse.error;
            }

            try {
              const channel = await guild.channels.fetch(dbChannel.discordId);
              await channel?.delete();
            } catch (e) {
              return `Failed to delete channel '${dbChannel.name}': Discord channel with \`id\` '${dbChannel.discordId}' does not exist`;
            }
            
            return `Successfully deleted channel '${dbChannel.name}'`;
          })());

          await subInteraction.editReply({
            content: messages.join("\n"),
            components: []
          });
        }
      }
      if (subInteraction.customId == "cancel") {
        await subInteraction.update({
          content: "Successfully cancelled",
          components: []
        });
      }
    });
  });