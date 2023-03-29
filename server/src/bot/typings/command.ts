import { DiscordClient } from "src/bot/structures/Client";
import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from "discord.js";

/**
 * {
 * name: "command name"
 * description: "any"
 * run: async({ interaction }) => {}
 * }
 */
export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  client: DiscordClient;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  userPermissions?: PermissionResolvable;
  run: RunFunction;
  // cooldown: number
} & ChatInputApplicationCommandData;
