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

export type Income = {
	month: string;
	id: number;
	income: bigint;
	userId: string;
};

type ColumnProps = {
	handleEdit: (income: Income) => void;
	handleDelete: (id: number) => void;
};

export const createColumns = ({
	handleEdit,
	handleDelete,
}: ColumnProps): ColumnDef<Income>[] => [
	{
		accessorKey: "month",
		header: "Month",
	},
	{
		accessorKey: "income",
		header: "Income",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const income = row.original;

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
						<DropdownMenuItem onClick={() => handleEdit(income)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleDelete(income.id)}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];