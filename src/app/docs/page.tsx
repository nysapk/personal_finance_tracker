// pages/docs.tsx
import React from "react";

const Documentation = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold text-sky-900">Documentation</h1>
			<p className="mt-4 text-sky-800">
				Here you'll find detailed documentation on how to use our platform.
			</p>
			<h2 className="mt-6 text-xl font-semibold text-sky-900">
				Getting Started
			</h2>
			<p className="mt-2 text-sky-800">
				To get started, create an account and log in. Once logged in, you can
				begin tracking your expenses and setting budgets.
			</p>
			<h2 className="mt-6 text-xl font-semibold text-sky-900">Features</h2>
			<ul className="mt-2 list-disc list-inside text-sky-800">
				<li>Expense Tracking</li>
				<li>Budget Planning</li>
				<li>Financial Reports</li>
				<li>Secure Data Storage</li>
			</ul>
		</div>
	);
};

export default Documentation;