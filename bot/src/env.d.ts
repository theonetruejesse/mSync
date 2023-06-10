declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_BOT_TOKEN: string;
      DISCORD_BOT_INTENT_EVERYTHING: string;
      DISCORD_BOT_GUILD_ID: string;
      DISCORD_BOT_CHANNEL_ID: string;
      TEST_BACKEND_URL: string;
      PROD_BACKEND_URL: string;
    }
  }
}

export {}
