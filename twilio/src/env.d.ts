declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NGROK_AUTHTOKEN: string;
      BACKEND_URL: string;
      PORT: number;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_PHONE_NUMBER: string;
    }
  }
}

export {}
