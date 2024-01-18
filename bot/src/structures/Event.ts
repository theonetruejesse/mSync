import { ClientEvents } from "discord.js";

/*
Might add more functionality.

Looks like there's no need thus far.
*/

export class Event<Key extends keyof ClientEvents> {
  constructor(
    public event: Key,
    public run: (...args: ClientEvents[Key]) => any
  ) {}
}
