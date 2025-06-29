import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db";

const createExpenseSchema = z.object({
	name: z.string().min(1).max(255),
	category: z.string().min(1).max(255),
	cost: z.number().int().positive(),
	purchaseTime: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
});

const updateExpenseSchema = z.object({
	id: z.number(),
	name: z.string().min(1).max(255),
	category: z.string().min(1).max(255),
	cost: z.number().int().positive(),
	purchaseTime: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
});

export const expenseRouter = createTRPCRouter({
	// Create Expense
	create: protectedProcedure
		.input(createExpenseSchema)
		.mutation(async ({ ctx, input }) => {
			console.log(ctx, input);
			const userId = ctx.session.user.id;
			const expense = await db.expense.create({
				data: {
					name: input.name,
					category: input.category,
					cost: input.cost,
					purchaseTime: new Date(input.purchaseTime),
					userId: userId,
				},
			});
			return expense;
		}),

	// Update Expense
	update: protectedProcedure
		.input(updateExpenseSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const expense = await db.expense.update({
				where: {
					id: input.id,
					userId: userId,
				},
				data: {
					name: input.name,
					category: input.category,
					cost: input.cost,
					purchaseTime: new Date(input.purchaseTime),
				},
			});

			return expense;
		}),

	// Get all Expenses
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;
		const expenses = await db.expense.findMany({
			where: { userId: userId },
			orderBy: { purchaseTime: "desc" },
		});
		console.log("server", expenses);
		return expenses;
	}),

	// Delete Expense
	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const deleted = await db.expense.delete({
				where: {
					id: input.id,
					userId: userId,
				},
			});

			return { success: true };
		}),
});

/* export const expenseRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
}); */