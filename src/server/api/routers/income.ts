import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";

const createIncomeSchema = z.object({
	month: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	income: z.number().min(0),
});

const updateIncomeSchema = z.object({
	id: z.number(),
	month: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	income: z.number().min(0),
});

export const incomeRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createIncomeSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;
			const income = await db.income.create({
				data: {
					month: input.month,
					income: BigInt(input.income),
					userId: userId,
				},
			});
			return income;
		}),

	update: protectedProcedure
		.input(updateIncomeSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const income = await db.income.update({
				where: {
					id: input.id,
					userId: userId,
				},
				data: {
					month: input.month,
					income: BigInt(input.income),
				},
			});

			return income;
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;
		const incomes = await db.income.findMany({
			where: { userId: userId },
			orderBy: { month: "desc" },
		});
		return incomes;
	}),

	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const deleted = await db.income.delete({
				where: {
					id: input.id,
					userId: userId,
				},
			});

			return { success: true };
		}),
});