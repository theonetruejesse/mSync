import { inferAsyncReturnType } from "@trpc/server";
import { prisma } from "./prisma";
import { send } from "./send";

export async function createContextInner() {
  return {
    prisma,
    send
  };
}

export async function createContext() {
  const contextInner = await createContextInner();

  return {
    ...contextInner
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
