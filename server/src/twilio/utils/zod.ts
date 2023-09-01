import { z } from "zod";
import {
  RenderInput,
  RenderDraft,
  RenderDraftType,
  RenderOutput
} from "../types/render";

export const $z = {
  render: {
    renderInput: (): z.ZodType<RenderInput> =>
      z.object({
        options: z.string().array()
      }),
    renderDraft: (): z.ZodType<RenderDraft> =>
      z.object({
        type: $z.render.renderDraftType(),
        content: z.string().optional(),
        options: z.string().array(),
        resolved: z.boolean()
      }),
    renderDraftType: (): z.ZodType<RenderDraftType> =>
      z.nativeEnum(RenderDraftType),
    renderOutput: (): z.ZodType<RenderOutput> =>
      z.object({
        type: $z.render.renderDraftType(),
        content: z.string(),
        options: z.string().array(),
        resolved: z.boolean()
      })
  }
};
