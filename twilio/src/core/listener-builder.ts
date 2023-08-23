import { Listener, ListenerHandler } from "../types/listener";

export class ListenerBuilder extends Listener {
  constructor() {
    super();
  }

  public setEvent(event: string) {
    this.event = event;
    return this;
  }

  public setHandler(handler: ListenerHandler) {
    this.handler = handler;
    return this;
  }

  public setOnce(once: boolean = true) {
    this.once = once;
    return this;
  }
}
