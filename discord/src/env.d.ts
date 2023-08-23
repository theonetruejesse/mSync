declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      BACKEND_URL: string;
      CLIENT_ID: string;
    }
  }
}

export {}
