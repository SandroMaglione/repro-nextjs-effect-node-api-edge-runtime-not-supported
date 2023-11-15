import { Effect, Option } from "effect";
import { z } from "zod";
import * as Base64 from "./Base64";
import * as JsonParse from "./JsonParse";
import { parseZod } from "./parse-zod";

export const IdOrUrl = z.object({
  type: z.union([z.literal("id"), z.literal("url")]),
  value: z.string(),
});
export interface IdOrUrl extends z.output<typeof IdOrUrl> {}

export const decode = (recipeIdOrUrl: string) =>
  Effect.gen(function* (_) {
    const idOrUrl = yield* _(Option.fromNullable(recipeIdOrUrl));

    const base64 = yield* _(Base64.Base64Service);
    const idOrUrlData = yield* _(base64.decode(idOrUrl));

    const json = yield* _(JsonParse.JsonParseService);
    const idOrUrlJson = yield* _(json.parse(idOrUrlData));

    return yield* _(idOrUrlJson, parseZod(IdOrUrl));
  });
