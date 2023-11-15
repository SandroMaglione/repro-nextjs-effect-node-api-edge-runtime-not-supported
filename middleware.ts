import { Effect, pipe } from "effect";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};

export async function middleware(request: NextRequest) {
  return pipe(
    Effect.promise(async () => NextResponse.next()),
    Effect.runPromise
  );
}
