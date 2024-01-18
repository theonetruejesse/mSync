import { config } from "dotenv-safe";
import { ExtendedClient } from "./core/ExtendedClient";

config();

export const client = new ExtendedClient();

client.start();