"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/components/ui/chart";

type Expense = {
	id: number;
	name: string;
	category: string;
	cost: number;
	purchaseTime: string;
	userId: string;
};

type ExpenseFormData = Omit<Expense, "id" | "userId">;

const defaultExpense: ExpenseFormData = {
	name: "",
	category: "",
	cost: 0,
	purchaseTime: new Date().toISOString().split("T")[0] ?? "",
};

export default function ExpenseTracker() {
	const [formData, setFormData] = useState<ExpenseFormData>(defaultExpense);
	const [editingId, setEditingId] = useState<number | null>(null);

	const utils = api.useUtils();
	const { data: expenses = [], isLoading } = api.expense.getAll.useQuery();

	const createMutation = api.expense.create.useMutation({
		onSuccess: () => {
			utils.expense.getAll.invalidate();
		},
	});

	const updateMutation = api.expense.update.useMutation({
		onSuccess: () => utils.expense.getAll.invalidate(),
	});

	const deleteMutation = api.expense.delete.useMutation({
		onSuccess: () => utils.expense.getAll.invalidate(),
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "cost" ? Number(value) : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (editingId) {
			updateMutation.mutate({ id: editingId, ...formData });
		} else {
			createMutation.mutate(formData);
		}
		setFormData(defaultExpense);
		setEditingId(null);
	};

	const handleEdit = (expense: Expense) => {
		setFormData({
			name: expense.name,
			category: expense.category,
			cost: expense.cost,
			purchaseTime: expense.purchaseTime,
		});
		setEditingId(expense.id);
	};

	const handleDelete = (id: number) => {
		deleteMutation.mutate({ id });
	};

	const columns = createColumns({ handleEdit, handleDelete });

	const chartData = useMemo(() => {
		const categoryTotals = expenses.reduce(
			(acc, expense) => {
				acc[expense.category] = (acc[expense.category] || 0) + expense.cost;
				return acc;
			},
			{} as Record<string, number>,
		);

		const blueShades = [
			"#1e3a8a", // Indigo
			"#2563eb", // Blue
			"#3b82f6", // Light Blue
			"#60a5fa", // Sky Blue
			"#93c5fd", // Pale Blue
		];

		let shadeIndex = 0;

		return Object.entries(categoryTotals).map(([category, total]) => {
			const color = blueShades[shadeIndex % blueShades.length];
			shadeIndex++;

			return {
				category,
				total: total / 100,
				fill: color,
			};
		});
	}, [expenses]);

	const totalExpenses = useMemo(() => {
		return expenses.reduce((acc, expense) => acc + expense.cost, 0);
	}, [expenses]);

	const chartConfig = useMemo(() => {
		return chartData.reduce((acc, { category }) => {
			acc[category] = {
				label: category,
				color: `hsl(${Math.random() * 360}, 70%, 50%)`,
			};
			return acc;
		}, {} as ChartConfig);
	}, [chartData]);

	if (isLoading) return <div className="text-center py-12">Loading...</div>;

	return (
		<>
			<div className="bg-sky-100 py-12 border-b border-sky-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-center text-center">
						<h1 className="text-4xl font-bold text-sky-900 mb-4">
							Your Expense Tracker
						</h1>
						<p className="text-xl text-sky-700 max-w-2xl">
							Keep track of your expenses and manage your finances with ease.
						</p>
					</div>
				</div>
			</div>

			<div className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">
						{editingId ? "Edit Expense" : "Add New Expense"}
					</h2>
					<form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
						<div>
							<Label className="text-sky-800">Name</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								required
								aria-label="Name"
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<Label className="text-sky-800">Category</Label>
							<Input
								id="category"
								name="category"
								value={formData.category}
								onChange={handleInputChange}
								required
								aria-label="Category"
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<Label className="text-sky-800">Cost</Label>
							<Input
								id="cost"
								name="cost"
								type="number"
								value={formData.cost}
								onChange={handleInputChange}
								required
								aria-label="Cost"
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<Label className="text-sky-800">Purchase Date</Label>
							<Input
								id="purchaseTime"
								name="purchaseTime"
								type="date"
								value={formData.purchaseTime}
								onChange={handleInputChange}
								required
								aria-label="Purchase Date"
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
						>
							{editingId ? "Update" : "Add"} Expense
						</Button>
					</form>
				</div>
			</div>

			<div className="bg-sky-50 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-12 text-center">
						Your Expenses
					</h2>
					{/* Table */}
					<div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
						<DataTable
							columns={columns}
							data={expenses.map((e) => ({
								...e,
								purchaseTime: e.purchaseTime.toISOString(),
							}))}
						/>
					</div>
					{/* Chart */}
					<div className="mt-8">
						<Card className="flex flex-col">
							<CardHeader className="items-center pb-0">
								<CardTitle> Expenses Chart </CardTitle>
							</CardHeader>
							<CardContent className="flex-1 pb-0">
								<ChartContainer
									config={chartConfig}
									className="mx-auto aspect-square max-h-[250px]"
								>
									<PieChart>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent hideLabel />}
										/>
										<Pie
											data={chartData}
											dataKey="total"
											nameKey="category"
											innerRadius={60}
											strokeWidth={5}
										>
											<Label
												content={({ viewBox }) => {
													if (viewBox && "cx" in viewBox && "cy" in viewBox) {
														return (
															<text
																x={viewBox.cx}
																y={viewBox.cy}
																textAnchor="middle"
																dominantBaseline="middle"
															>
																<tspan
																	x={viewBox.cx}
																	y={viewBox.cy}
																	className="fill-foreground text-3xl font-bold"
																>
																	${(totalExpenses / 100).toFixed(2)}
																</tspan>
																<tspan
																	x={viewBox.cx}
																	y={(viewBox.cy || 0) + 24}
																	className="fill-muted-foreground"
																>
																	Total
																</tspan>
															</text>
														);
													}
												}}
											/>
										</Pie>
									</PieChart>
								</ChartContainer>
							</CardContent>
							<CardFooter className="flex-col gap-2 text-sm">
								<div className="leading-none text-muted-foreground">
									Showing total expenses for the month
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}