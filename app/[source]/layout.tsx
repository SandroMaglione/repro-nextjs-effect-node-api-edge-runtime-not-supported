import { Effect, Layer, pipe } from "effect";
import type { ReactNode } from "react";
import * as Base64 from "./Base64";
import * as JsonParse from "./JsonParse";
import * as Decode from "./decode-id-or-url";

interface Props {
  children: ReactNode;
  params: { source: string };
}

export default function Layout({ children, params: { source } }: Props) {
  const decodeUrl = pipe(
    Decode.decode(source),
    Effect.catchAll(() => Effect.succeed(null)),
    Effect.provide(
      Layer.merge(Base64.Base64ServiceLive, JsonParse.JsonParseServiceLive)
    ),
    Effect.runSync
  );

  return (
    <div>
      <span>{JSON.stringify(decodeUrl)}</span>
      {children}
    </div>
  );
}
