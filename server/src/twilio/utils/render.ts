import { RenderDraftType, RenderDraft, RenderInput } from "../types/render";

export class RenderDraftBuilder extends RenderDraft {
  setContent(content: string) {
    this.content = content;
    return this;
  }

  addOptions(...options: string[]) {
    this.options.push(...options);
    this.type = RenderDraftType.MENU;
    return this;
  }

  public setResolved(resolved: boolean) {
    this.resolved = resolved;
    return this;
  }
}

export async function render(
  generator: (input: RenderInput) => RenderDraft | Promise<RenderDraft>,
  input: RenderInput
) {
  const draft = await generator(input);
  if (draft.type == RenderDraftType.MENU) {
    return {
      type: draft.type,
      content: `${draft.content}\n${Object.entries(draft.options)
        .map(([index, value]) => `${parseInt(index) + 1}: ${value}`)
        .join("\n")}\n\n(or 'cancel' to cancel and 'back' to go back)`,
      options: draft.options,
      resolved: draft.resolved
    };
  }
  if (draft.type == RenderDraftType.RESPONSE) {
    return {
      type: draft.type,
      content: `${draft.content}\n\n(or 'cancel' to cancel and 'back' to go back)`,
      options: draft.options,
      resolved: draft.resolved
    };
  }
  throw "Invalid render draft";
}
