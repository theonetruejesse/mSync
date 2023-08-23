import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import fetch from "node-fetch";
import type { AppRouter } from "../../../server/dist/index";

// Fetch polyfill; fixes "TRPCClientError: No fetch implementation found"
(global as any).fetch = fetch;

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.BACKEND_URL
    })
  ]
}).discord;
