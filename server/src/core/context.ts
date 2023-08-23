import { inferAsyncReturnType } from "@trpc/server";
import { prisma } from "./prisma";

export async function createContextInner() {
  return {
    prisma
  };
}

export async function createContext() {
  const contextInner = await createContextInner();

  return {
    ...contextInner
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
