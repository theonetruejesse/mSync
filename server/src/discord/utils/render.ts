import { z } from "zod";
import { $z } from "./zod";
import {
  ButtonInput,
  StringSelectMenuInput,
  RenderInput,
  RenderDraft
} from "../types/render";
import { StringSelectMenuBuilder } from "discord.js";

function isButtonInput(
  input: ButtonInput | StringSelectMenuInput
): input is ButtonInput {
  return z.lazy(() => $z.render.buttonInput()).safeParse(input).success;
}

function isStringSelectMenuInput(
  input: ButtonInput | StringSelectMenuInput
): input is StringSelectMenuInput {
  return z.lazy(() => $z.render.stringSelectMenuInput()).safeParse(input)
    .success;
}

function filterButtonInput(input: ButtonInput) {
  return input.value;
}

function filterStringSelectMenuInput(input: StringSelectMenuInput) {
  return input.values.length > 0;
}

export async function render(
  generator: (input: RenderInput) => RenderDraft | Promise<RenderDraft>,
  input: RenderInput
) {
  const filteredInput: RenderInput = {};
  for (const customId in input) {
    const row = input[customId];
    if (isButtonInput(row) && filterButtonInput(row)) {
      filteredInput[customId] = row;
    }
    if (isStringSelectMenuInput(row) && filterStringSelectMenuInput(row)) {
      filteredInput[customId] = row;
    }
  }
  const draft = await generator(filteredInput);
  return {
    content: draft.content,
    components: draft.components?.map((actionRow) => {
      if (actionRow.components[0] instanceof StringSelectMenuBuilder) {
        const [component] = actionRow.components;
        const customId = component.data.custom_id;
        if (customId && input.hasOwnProperty(customId)) {
          const row = input[customId] as StringSelectMenuInput;
          for (const option of component.options) {
            const value = option.data.value;
            if (value && row.values.includes(value)) {
              option.setDefault(true);
            }
          }
        }
      }
      return actionRow.toJSON();
    }),
    resolved: draft.resolved
  };
}

export class RenderDraftBuilder extends RenderDraft {
  public setContent(content: string) {
    this.content = content;
    return this;
  }

  public addComponents(...components: NonNullable<RenderDraft["components"]>) {
    this.components.push(...components);
    return this;
  }

  public setComponents(...components: NonNullable<RenderDraft["components"]>) {
    this.components = components;
    return this;
  }

  public setResolved(resolved: boolean) {
    this.resolved = resolved;
    return this;
  }
}
