export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  discordId?: string;
  channelId: string;
  roleId: number;
}
export interface Role {
  id: number;
  name: string;
}

export enum Platform {
  DISCORD,
  SMS,
}
