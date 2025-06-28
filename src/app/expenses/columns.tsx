"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export type Expense = {
	id: number;
	name: string;
	category: string;
	cost: number;
	purchaseTime: string;
	userId: string;
};

type ColumnProps = {
	handleEdit: (expense: Expense) => void;
	handleDelete: (id: number) => void;
};

export const createColumns = ({
	handleEdit,
	handleDelete,
}: ColumnProps): ColumnDef<Expense>[] => [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "cost",
		header: "Cost",
		cell: ({ getValue }) => {
			const costInDollars = (getValue<number>() / 100).toFixed(2);
			return `$${costInDollars}`;
		},
	},
	{
		accessorKey: "purchaseTime",
		header: "Purchase Date",
		cell: ({ getValue }) => {
			const date = new Date(getValue<string>());
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const expense = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => handleEdit(expense)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleDelete(expense.id)}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];