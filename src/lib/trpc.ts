import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { inferProcedureOutput } from "@trpc/server";
import superjson from "superjson";
import type { AppRouter } from "~/server/api/root";

export type Expense = inferProcedureOutput<AppRouter["expense"]["getAll"]>;

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "/api/trpc",
			transformer: superjson,
		}),
	],
});