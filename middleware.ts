import { Effect, pipe } from "effect";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};

export async function middleware() {
  return pipe(
    Effect.promise(async () => NextResponse.next()),
    Effect.runPromise
  );
}
