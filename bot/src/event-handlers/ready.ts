import { Event } from "../core/Event";

export default new Event("ready", (bot) => {
  console.log(`${bot.user.tag} is ready!`);
});
