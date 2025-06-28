"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DataTable } from "./data-table";
import { createColumns } from "./columns";

export type Budget = {
	id: number;
	category: string;
	month: string;
	budget: number;
	userId: string;
};

type BudgetFormData = Omit<Budget, "id" | "userId">;

const defaultBudget: BudgetFormData = {
	category: "",
	month: new Date().toISOString(),
	budget: 0,
};

export default function BudgetTracker() {
	const [formData, setFormData] = useState<BudgetFormData>(defaultBudget);
	const [editingId, setEditingId] = useState<number | null>(null);

	const utils = api.useUtils();
	const { data: budgets = [], isLoading: loadingBudgets } =
		api.budget.getAll.useQuery();
	const { data: expenses = [], isLoading: loadingExpenses } =
		api.expense.getAll.useQuery();

	const createMutation = api.budget.create.useMutation({
		onSuccess: () => {
			utils.budget.getAll.invalidate();
		},
	});

	const updateMutation = api.budget.update.useMutation({
		onSuccess: () => utils.budget.getAll.invalidate(),
	});

	const deleteMutation = api.budget.delete.useMutation({
		onSuccess: () => utils.budget.getAll.invalidate(),
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "budget" ? Number.parseInt(value) : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const inputData = {
			id: editingId,
			category: formData.category,
			month: formData.month.toString(),
			budget: formData.budget,
		};

		if (editingId) {
			updateMutation.mutate(
				inputData as {
					id: number;
					category: string;
					month: string;
					budget: number;
				},
			);
		} else {
			createMutation.mutate(
				inputData as { category: string; month: string; budget: number },
			);
		}

		setFormData(defaultBudget);
		setEditingId(null);
	};

	const handleEdit = (budget: Budget) => {
		setFormData({
			category: budget.category,
			month: budget.month,
			budget: budget.budget,
		});
		setEditingId(budget.id);
	};

	const handleDelete = (id: number) => {
		deleteMutation.mutate({ id });
	};

	if (loadingBudgets || loadingExpenses)
		return <div className="text-center py-12">Loading...</div>;

	const aggregatedBudgets = budgets.reduce(
		(acc, budget) => {
			if (!acc[budget.category]) {
				acc[budget.category] = { budget: 0, category: budget.category };
			}
			acc[budget.category].budget += budget.budget;
			return acc;
		},
		{} as Record<string, { budget: number; category: string }>,
	);

	const aggregatedExpenses = expenses.reduce(
		(acc, expense) => {
			if (!acc[expense.category]) {
				acc[expense.category] = { spent: 0, category: expense.category };
			}
			acc[expense.category].spent += expense.cost / 100;
			return acc;
		},
		{} as Record<string, { spent: number; category: string }>,
	);

	const chartData = Object.keys(aggregatedBudgets).map((category) => {
		const budgetData = aggregatedBudgets[category];
		const expenseData = aggregatedExpenses[category] || { spent: 0 };

		return {
			category,
			budget: budgetData.budget,
			spent: expenseData.spent,
		};
	});

	return (
		<>
			<div className="bg-sky-100 py-12 border-b border-sky-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row items-center justify-center">
						<div className="md:w-1/2 mb-8 md:mb-0 text-center">
							<h1 className="text-4xl font-bold text-sky-900 mb-4">
								Your Budget Tracker
							</h1>
							<p className="text-xl text-sky-700">
								Track your budget allocations and manage expenses effectively.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">
						{editingId ? "Edit Budget" : "Add New Budget"}
					</h2>
					<form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
						<div>
							<Label htmlFor="category" className="text-sky-800">
								Category
							</Label>
							<Input
								id="category"
								name="category"
								type="text"
								value={formData.category}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<Label htmlFor="month" className="text-sky-800">
								Month
							</Label>
							<Input
								id="month"
								name="month"
								type="date"
								value={formData.month.toString().split("T")[0]}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<Label htmlFor="budget" className="text-sky-800">
								Budget Amount
							</Label>
							<Input
								id="budget"
								name="budget"
								type="number"
								value={formData.budget.toString()}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
						>
							{editingId ? "Update" : "Add"} Budget
						</Button>
					</form>
				</div>
			</div>

			<div className="bg-sky-50 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
					<Card className="w-full max-w-4xl">
						<CardHeader>
							<CardTitle>Budget vs. Spent</CardTitle>
						</CardHeader>
						<CardContent>
							<BarChart width={800} height={400} data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="category" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="budget" fill="#1E90FF" />
								<Bar dataKey="spent" fill="#87CEFA" />
							</BarChart>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white shadow overflow-hidden sm:rounded-lg">
						<DataTable
							columns={createColumns({ handleEdit, handleDelete })}
							data={budgets}
						/>
					</div>
				</div>
			</div>
		</>
	);
}