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

export type RenderDraft = {
  content?: string;
  components?: (
    | ActionRowBuilder<ButtonBuilder>
    | ActionRowBuilder<StringSelectMenuBuilder>
  )[];
  resolved: boolean;
};

export type RenderOutput = {
  content?: string;
  components?: (
    | APIActionRowComponent<APIButtonComponent>
    | APIActionRowComponent<APISelectMenuComponent>
  )[];
  resolved: boolean;
};
