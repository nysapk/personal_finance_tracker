import React from "react";

const Status = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold text-sky-900">System Status</h1>
			<p className="mt-4 text-sky-800">
				All systems operational. No current outages or issues reported.
			</p>
			<h2 className="mt-6 text-xl font-semibold text-sky-900">
				Scheduled Maintenance
			</h2>
			<p className="mt-2 text-sky-800">
				Our next scheduled maintenance will be on the first Sunday of each
				month. Please check back to this page for any updates.
			</p>
		</div>
	);
};

export default Status;