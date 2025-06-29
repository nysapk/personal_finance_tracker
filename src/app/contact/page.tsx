// pages/contact.tsx
import React from "react";

const Contact = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-4xl font-bold text-sky-900">Contact Us</h1>
			<p className="mt-4 text-sky-800 text-lg">
				We’re here to help! If you have any questions, feedback, or need
				assistance, please reach out to us:
			</p>
			<p className="mt-2 text-sky-800">
				<strong>Email:</strong>
				<a
					href="mailto:contact@financetracker.com"
					className="text-sky-700 hover:underline"
				>
					{" "}
					contact@financetracker.com
				</a>
			</p>
			<h2 className="mt-6 text-2xl font-semibold text-sky-900">Feedback</h2>
			<p className="mt-2 text-sky-800 text-lg">
				We value your feedback and suggestions. If you have ideas on how we can
				improve or features you'd like to see, please let us know!
			</p>
		</div>
	);
};

export default Contact;