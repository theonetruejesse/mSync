export type ListenerHandler = (...args: any[]) => Promise<void> | void;

export class Listener {
  public event?: string;
  public handler?: ListenerHandler;
  public once: boolean = false;
}
