declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_NUMBER: string;
      PERSONAL_NUMBER: string;
      DATABASE_URL: string;
      PORT: string;
    }
  }
}

export {}
