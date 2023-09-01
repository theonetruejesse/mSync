export type RenderInput = {
  options: string[];
};

export enum RenderDraftType {
  MENU = "menu",
  RESPONSE = "response"
}

export class RenderDraft {
  public type: RenderDraftType = RenderDraftType.RESPONSE;
  public content?: string;
  public options: string[] = [];
  public resolved: boolean = false;
}

export type RenderOutput = RenderDraft & { content: string };
