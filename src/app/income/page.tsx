"use client";

import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export type Income = {
	id: number;
	month: string;
	income: bigint;
	userId: string;
};

type IncomeFormData = Omit<Income, "id" | "userId">;

const defaultIncome: IncomeFormData = {
	month: new Date().toISOString(),
	income: BigInt(0),
};

export default function IncomeTracker() {
	const [formData, setFormData] = useState<IncomeFormData>(defaultIncome);
	const [editingId, setEditingId] = useState<number | null>(null);

	const utils = api.useUtils();
	const { data: income = [], isLoading } = api.income.getAll.useQuery();

	const createMutation = api.income.create.useMutation({
		onSuccess: () => {
			utils.income.getAll.invalidate();
		},
	});

	const updateMutation = api.income.update.useMutation({
		onSuccess: () => utils.income.getAll.invalidate(),
	});

	const deleteMutation = api.income.delete.useMutation({
		onSuccess: () => utils.income.getAll.invalidate(),
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "income" ? Number.parseInt(value) : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const inputData = {
			id: editingId,
			month: formData.month.toString(),
			income: Number(formData.income),
		};

		if (editingId) {
			updateMutation.mutate(
				inputData as { id: number; month: string; income: number },
			);
		} else {
			createMutation.mutate(inputData as { month: string; income: number });
		}

		setFormData(defaultIncome);
		setEditingId(null);
	};

	const handleEdit = (income: Income) => {
		setFormData({
			month: income.month,
			income: income.income,
		});
		setEditingId(income.id);
	};

	const handleDelete = (id: number) => {
		deleteMutation.mutate({ id });
	};

	const columns = createColumns({ handleEdit, handleDelete });

	if (isLoading) return <div className="text-center py-12">Loading...</div>;

	return (
		<>
			<div className="bg-sky-100 py-12 border-b border-sky-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row items-center justify-center">
						<div className="md:w-1/2 mb-8 md:mb-0 text-center">
							<h1 className="text-4xl font-bold text-sky-900 mb-4">
								Your Income Tracker
							</h1>
							<p className="text-xl text-sky-700">
								Keep track of your income sources and manage your finances with
								ease.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">
						{editingId ? "Edit Income" : "Add New Income"}
					</h2>
					<form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
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
							<Label htmlFor="income" className="text-sky-800">
								Income Amount
							</Label>
							<Input
								id="income"
								name="income"
								type="bigint"
								value={formData.income.toString()}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full border-sky-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
						>
							{editingId ? "Update" : "Add"} Income
						</Button>
					</form>
				</div>
			</div>

			<div className="bg-sky-50 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-12 text-center">
						Your Income Records
					</h2>
					<div className="bg-white shadow overflow-hidden sm:rounded-lg">
						<DataTable
							columns={columns}
							data={income.map((i) => ({
								...i,
								month: i.month,
							}))}
						/>
					</div>
				</div>
			</div>
		</>
	);
}