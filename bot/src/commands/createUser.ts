import { ChannelType, PermissionsBitField, SlashCommandStringOption } from "discord.js";
import { Command } from "../structures/Command";
import { createUser, createParticipant } from "../requests/message";

const DISCORD_PLATFORM = 2; // place constants in a constants.ts file
const STUDENT_ROLE = 3; // also probably worth checking which env vars are actually env vars and which are just constants

function validateName(name: string) { // move utils to util file
  return /^\w+$/.test(name);
}

function validatePhoneNumber(phoneNumber: string) { // move utils to util file
  return /^\d+$/.test(phoneNumber);
}

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
      .setRequired(true)
  ],
  defaultMemberPermissions: [
    PermissionsBitField.Flags.Administrator
  ],
  run: async ({ interaction }) => {
    let { guild } = interaction;
    if (guild == null) return;

    const botId = interaction.client.user.id;
    const hostId = interaction.member.id; // add comment specifying what hostId is

    const firstName = (interaction.options.get("first-name")?.value ?? "null") as string;
    const lastName = (interaction.options.get("last-name")?.value ?? "null") as string;

    if (!validateName(firstName) || !validateName(lastName)) {
      interaction.editReply("Invalid name");
      return;
    }

    const { id: channelId } = await guild.channels.create({
      name: `${firstName} ${lastName}`,
      type: ChannelType.GuildText,
      parent: process.env.DISCORD_BOT_CATEGORY_ID, // did you remember to run gen-env?
      permissionOverwrites: [ // add comment specifying what these settings enable
        { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: botId, allow: [PermissionsBitField.Flags.ViewChannel] },
        { id: hostId, allow: [PermissionsBitField.Flags.ViewChannel] }
      ]
    });
    console.log(`Channel \`${channelId}\` created!`);

    const { id: userId } = await createUser({
      firstName,
      lastName
    });
    console.log(`User \`${userId}\` created!`);

    const { id: participantId } = await createParticipant({
      channelId,
      messagingId: hostId, // should be phone number
      platformId: DISCORD_PLATFORM, // should be sms platform
      roleId: STUDENT_ROLE,
      userId
    });
    console.log(`Participant \`${participantId}\` created!`);

    interaction.editReply(`<#${channelId}> created!`);
  },
});
