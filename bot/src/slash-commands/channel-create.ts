import { ChannelType, EmbedBuilder, SlashCommandStringOption } from "discord.js";
import { ExtendedSlashCommandBuilder } from "../core/ExtendedSlashCommandBuilder";
import { trpc } from "../trpc";

export default new ExtendedSlashCommandBuilder()
  .setName("channel-create")
  .setDescription("Create a channel")
  .addStringOption(new SlashCommandStringOption()
    .setName("name")
    .setDescription("Name of the channel to be created")
    .setRequired(true))
  .setHandler(async interaction => {
    await interaction.deferReply();

    const { guild } = interaction;
    if (!guild) return;

    const name = interaction.options.getString("name", true);

    let category = guild.channels.cache.find(channel => channel.name == "bot-channels");
    if (!category) {
      category = await guild.channels.create({
        name: "bot-channels",
        type: ChannelType.GuildCategory
      });
    }

    const channel = await guild.channels.create({
      name,
      type: ChannelType.GuildText,
      parent: category.id
    });
    const discordId = channel.id;

    const dbChannelResponse = await trpc.discord.channel.create.mutate({
      discordId,
      name
    });
    if (!dbChannelResponse.success) {
      await guild.channels.delete(channel);
      await interaction.editReply(`Failed to create channel '${name}': ` + dbChannelResponse.error);
      return;
    }

    await channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Hello World!")
          .addFields(
            { name: "Channel", value: "`/channel-delete` to **delete** the channel\n`/channel-rename` to **rename** the channel" },
            { name: "People", value: "`/person-add` to **add** a person to the channel\n`/person-remove` to **remove** a person from the channel" },
            { name: "Roles", value: "`/role-assign` to **assign** a role to a person in the channel\n`/role-revoke` to **revoke** a role from a person in the channel" },
          )
      ]
    });

    await interaction.editReply(`Successfully created channel '${name}'`);
  });