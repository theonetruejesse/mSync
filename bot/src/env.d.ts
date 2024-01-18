declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_BOT_TOKEN: string;
      DISCORD_BOT_INTENT_EVERYTHING: string;
      DISCORD_BOT_GUILD_ID: string;
      DISCORD_BOT_CHANNEL_ID: string;
      DISCORD_BOT_CATEGORY_ID: string;
      DISCORD_BOT_CLIENT_ID: string;
      BACKEND_URL: string;
    }
  }
}

export {}
