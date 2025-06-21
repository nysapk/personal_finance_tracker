import React from "react";

export default function About() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-4xl font-bold text-sky-900">About Us</h1>
			<p className="mt-4 text-sky-800 text-lg">
				FinanceTracker was founded with the mission to simplify personal finance
				management for everyone. We believe that financial literacy is a crucial
				skill that can lead to a more secure and fulfilling life. Our goal is to
				help you take control of your financial future.
			</p>
			<h2 className="mt-6 text-2xl font-semibold text-sky-900">Our Mission</h2>
			<p className="mt-2 text-sky-800 text-lg">
				WE aim to empower individuals by providing intuitive tools and resources
				that make financial management accessible and engaging. We aim to
				educate and inspire our users to develop good financial habits that lead
				to lasting change.
			</p>
			<h2 className="mt-6 text-2xl font-semibold text-sky-900">Our Values</h2>
			<ul className="mt-4 list-disc list-inside text-sky-800">
				<li>
					🌟 <strong>Transparency:</strong> We believe in clear and honest
					communication.
				</li>
				<li>
					🤝 <strong>Community:</strong> We foster a supportive environment for
					learning and growth.
				</li>
				<li>
					📚 <strong>Education:</strong> We are committed to providing valuable
					resources to improve financial literacy.
				</li>
				<li>
					🛠️ <strong>Innovation:</strong> We continuously strive to enhance our
					platform to better serve our users.
				</li>
			</ul>
		</div>
	);
}