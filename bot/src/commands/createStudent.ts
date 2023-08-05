import {
  ChannelType,
  PermissionsBitField,
  SlashCommandStringOption,
  ChatInputCommandInteraction,
} from "discord.js";
import { Command } from "../structures/Command";
import { createUser, createParticipant } from "../requests/message";
import { validateName, validatePhoneNumber } from "../utils/validate";
import { SMS_PLATFORM, STUDENT_ROLE } from "../constants";

export default new Command({
  name: "create-student",
  description: "adds a student into the mSync system",
  options: [
    new SlashCommandStringOption()
      .setName("first-name")
      .setDescription("First name of the student")
      .setRequired(true),
    new SlashCommandStringOption()
      .setName("last-name")
      .setDescription("Last name of the student")
      .setRequired(true),
    new SlashCommandStringOption()
      .setName("phone-number")
      .setDescription("Phone number of the student")
      .setRequired(true),
  ],
  defaultMemberPermissions: [PermissionsBitField.Flags.Administrator],
  run: async ({ interaction }) => {
    let { guild } = interaction;
    if (guild == null) return;

    const setOptionType = (option: string): string | null => {
      const interactionOption = interaction.options.get(option);
      if (!interactionOption || !interactionOption.value) return null;
      return interactionOption.value as string;
    };

    const firstName = setOptionType("first-name");
    const lastName = setOptionType("last-name");
    const phoneNumber = setOptionType("phone-number");

    if (!firstName || !validateName(firstName)) {
      interaction.editReply("Invalid first name");
      return;
    }

    if (!lastName || !validateName(lastName)) {
      interaction.editReply("Invalid last name");
      return;
    }

    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      interaction.editReply("Invalid phone number");
      return;
    }

    const discordUserId = interaction.client.user.id;
    const { id: channelId } = await guild.channels.create({
      name: `${firstName} ${lastName}`,
      type: ChannelType.GuildText,
      parent: process.env.DISCORD_BOT_CATEGORY_ID,
      permissionOverwrites: [
        // add comment specifying what these settings enable
        { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: discordUserId, allow: [PermissionsBitField.Flags.ViewChannel] },
      ],
    });
    console.log(`Channel \`${channelId}\` created!`);

    const { id: userId } = await createUser({
      firstName,
      lastName,
    });
    console.log(`User \`${userId}\` created!`);

    const { id: participantId } = await createParticipant({
      channelId,
      messagingId: phoneNumber, // should be phone number
      platformId: SMS_PLATFORM,
      roleId: STUDENT_ROLE,
      userId,
    });
    console.log(`Participant \`${participantId}\` created!`);

    interaction.editReply(`<#${channelId}> created!`);
  },
});
