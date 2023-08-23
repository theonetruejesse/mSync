import { Events } from "../types/event";
import { ListenerBuilder } from "../core/listener-builder";
import { log } from "../utils/log";

export default new ListenerBuilder()
  .setEvent(Events.Ready)
  .setHandler(async () => {
    log("Ready");
  });
