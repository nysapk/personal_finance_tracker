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

// Adjusting the Budget type to match Prisma schema
export type Budget = {
	id: number;
	category: string;
	month: string;
	budget: number;
	userId: string;
};

type ColumnProps = {
	handleEdit: (budget: Budget) => void;
	handleDelete: (id: number) => void;
};

export const createColumns = ({
	handleEdit,
	handleDelete,
}: ColumnProps): ColumnDef<Budget>[] => [
	{
		accessorKey: "month",
		header: "Month",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "budget",
		header: "Budget",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const budget = row.original;

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
						<DropdownMenuItem onClick={() => handleEdit(budget)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleDelete(budget.id)}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];