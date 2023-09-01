import type {
  APIActionRowComponent,
  APIButtonComponent,
  APISelectMenuComponent,
  ActionRowBuilder,
  ButtonBuilder,
  ComponentType,
  StringSelectMenuBuilder
} from "discord.js";

export type ButtonInput = {
  type: ComponentType.Button;
  value: boolean;
};

export type StringSelectMenuInput = {
  type: ComponentType.StringSelect;
  values: string[];
};

export type RenderInput = {
  [customId: string]: ButtonInput | StringSelectMenuInput;
};

export class RenderDraft {
  public content?: string;
  public components: (
    | ActionRowBuilder<ButtonBuilder>
    | ActionRowBuilder<StringSelectMenuBuilder>
  )[] = [];
  public resolved: boolean = false;
};

export class RenderOutput {
  public content?: string;
  public components: (
    | APIActionRowComponent<APIButtonComponent>
    | APIActionRowComponent<APISelectMenuComponent>
  )[] = [];
  public resolved: boolean = false;
};
