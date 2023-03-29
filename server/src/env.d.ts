declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_BOT_TOKEN: string;
      DISCORD_BOT_INTENT_EVERYTHING: string;
      DISCORD_BOT_GUILD_ID: string;
      DISCORD_BOT_CHANNEL_ID: string;
      PORT: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_NUMBER: string;
      PERSONAL_NUMBER: string;
      DATABASE_URL: string;
    }
  }
}

export {}
