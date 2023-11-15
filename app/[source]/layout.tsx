import { Effect, pipe } from "effect";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { source: string };
}

export default function Layout({ children, params: { source } }: Props) {
  const value = pipe(Effect.succeed(0), Effect.runSync);
  return (
    <div>
      <span>{source}</span>
      <span>{value}</span>
      {children}
    </div>
  );
}
