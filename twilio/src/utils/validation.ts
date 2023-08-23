import { z } from "zod";
import { $z } from "../utils/zod";
import { IncomingMessage } from "../types/twilio";

export function isIncomingMessage(body: any): body is IncomingMessage {
  return z.lazy(() => $z.incomingMessage()).safeParse(body).success;
}
