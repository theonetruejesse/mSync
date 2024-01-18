import { discordProcedure } from "../../core/trpc";
import { z } from "zod";
import { $z } from "../utils/zod";
import { render } from "../utils/render";
import { RenderDraftBuilder } from "../utils/render";

export const createClient = discordProcedure
  .input(z.lazy(() => $z.render.renderInput()))
  .output(z.lazy(() => $z.render.renderOutput()))
  .mutation(({ input }) => {
    return render((input) => {
      const rv = new RenderDraftBuilder();
      rv.setContent("add client");
      return rv;
    }, input);
  });