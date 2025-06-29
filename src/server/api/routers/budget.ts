import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const createBudgetSchema = z.object({
	month: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	category: z.string().min(1).max(255),
	budget: z.number().min(0),
});

const updateBudgetSchema = z.object({
	id: z.number(),
	month: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	category: z.string().min(1).max(255),
	budget: z.number().min(0),
});

export const budgetRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createBudgetSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;
			const budget = await db.budget.create({
				data: {
					month: input.month,
					category: input.category,
					budget: input.budget,
					userId: userId,
				},
			});
			return budget;
		}),

	update: protectedProcedure
		.input(updateBudgetSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const budget = await db.budget.update({
				where: {
					id: input.id,
					userId: userId,
				},
				data: {
					category: input.category,
					budget: input.budget,
					month: input.month,
				},
			});

			return budget;
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;
		const budgets = await db.budget.findMany({
			where: { userId: userId },
			orderBy: { month: "desc" },
		});
		return budgets;
	}),

	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const deleted = await db.budget.delete({
				where: {
					id: input.id,
					userId: userId,
				},
			});

			return { success: true };
		}),
});