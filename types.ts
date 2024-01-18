// currently useless, todo -> restructure project to use types + shared utils + libs
// or just like, migrate to tRPC

enum Platform {
  SMS,
  DISCORD,
}

export interface MessageRequest {
  currentUserId: string;
  platformId: Platform;
  message: string;
}
