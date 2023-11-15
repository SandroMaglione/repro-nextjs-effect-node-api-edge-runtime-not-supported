import { Data, Either } from "effect";
import type { z } from "zod";

export class ZodParseError<In> extends Data.TaggedError("ZodParseError")<{
  error: z.ZodError<In>;
}> {}

export const parseZod =
  <ReqOut, ReqIn>(schema: z.Schema<ReqOut, z.ZodTypeDef, ReqIn>) =>
  <T>(data: T): Either.Either<ZodParseError<ReqIn>, ReqOut> => {
    const parsed = schema.safeParse(data);
    return parsed.success
      ? Either.right(parsed.data)
      : Either.left(new ZodParseError({ error: parsed.error }));
  };
