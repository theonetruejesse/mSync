import { z } from "zod";
import {
  APIActionRowComponent,
  APIButtonComponentWithCustomId,
  ButtonStyle,
  APIStringSelectComponent,
  APISelectMenuOption,
  ComponentType
} from "discord.js";
import {
  ButtonInput,
  StringSelectMenuInput,
  RenderInput,
  RenderOutput
} from "../types/render";

export const $z = {
  render: {
    buttonInput: (): z.ZodType<ButtonInput> =>
      z.object({
        type: z.literal(ComponentType.Button),
        value: z.boolean()
      }),
    stringSelectMenuInput: (): z.ZodType<StringSelectMenuInput> =>
      z.object({
        type: z.literal(ComponentType.StringSelect),
        values: z.string().array()
      }),
    renderInput: (): z.ZodType<RenderInput> =>
      z.record(
        z.union([$z.render.buttonInput(), $z.render.stringSelectMenuInput()])
      ),
    renderOutput: (): z.ZodType<RenderOutput> =>
      z.object({
        content: z.string().optional(),
        components: $z.component.actionRow().array(),
        resolved: z.boolean()
      })
  },
  component: {
    // https://discord.com/developers/docs/interactions/message-components#action-rows
    actionRowButton: (): z.ZodType<
      APIActionRowComponent<APIButtonComponentWithCustomId>
    > =>
      z.object({
        type: z.literal(ComponentType.ActionRow),
        components: $z.component.button().array()
      }),
    actionRowStringSelectMenu: (): z.ZodType<
      APIActionRowComponent<APIStringSelectComponent>
    > =>
      z.object({
        type: z.literal(ComponentType.ActionRow),
        components: $z.component.stringSelectMenu().array()
      }),
    actionRow: (): z.ZodType<
      | APIActionRowComponent<APIButtonComponentWithCustomId>
      | APIActionRowComponent<APIStringSelectComponent>
    > =>
      z.union([
        $z.component.actionRowButton(),
        $z.component.actionRowStringSelectMenu()
      ]),
    // https://discord.com/developers/docs/interactions/message-components#buttons
    button: (): z.ZodType<APIButtonComponentWithCustomId> =>
      z.object({
        type: z.literal(ComponentType.Button),
        style: z
          .number()
          .int()
          .refine((i) => Object.values(ButtonStyle).includes(i)),
        label: z.string().optional(),
        emoji: z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            animated: z.boolean().optional()
          })
          .optional(),
        custom_id: z.string(),
        url: z.string().optional(),
        disabled: z.boolean().optional()
      }),
    // https://discord.com/developers/docs/interactions/message-components#select-menus
    stringSelectMenu: (): z.ZodType<APIStringSelectComponent> =>
      z.object({
        type: z.literal(ComponentType.StringSelect),
        custom_id: z.string(),
        options: $z.component.stringSelectMenuOption().array().max(25),
        placeholder: z.string().optional(),
        min_values: z.number().int().optional(),
        max_values: z.number().int().optional(),
        disabled: z.boolean().optional()
      }),
    stringSelectMenuOption: (): z.ZodType<APISelectMenuOption> =>
      z.object({
        label: z.string(),
        value: z.string(),
        description: z.string().optional(),
        emoji: z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            animated: z.boolean().optional()
          })
          .optional(),
        default: z.boolean().optional()
      })
  }
};
