import { config } from "dotenv-safe";
config();

import { Bot } from "./core/bot";

export const bot = new Bot();
bot.init();
