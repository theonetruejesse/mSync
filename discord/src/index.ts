import { config } from "dotenv-safe";
import { Bot } from "./core/bot";

config();

export const bot = new Bot();
bot.init();
