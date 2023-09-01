import { Awaiter } from "../types/awaiter";
import { Client } from "./client";

export class AwaiterBuilder extends Awaiter {
  constructor() {
    super();
  }

  public setFrom(from: string) {
    this.from = from;
    return this;
  }

  public setClient(client: Client) {
    this.client = client;
    return this;
  }

  public setTimeout(timeout: number) {
    this.timeout = timeout;
    return this;
  }
}
