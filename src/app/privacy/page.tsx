// pages/privacy.tsx
import React from "react";

const PrivacyPolicy = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold text-sky-900">Privacy Policy</h1>
			<p className="mt-4 text-sky-800">
				Your privacy is important to us. This privacy policy outlines how we
				collect, use, and protect your information.
			</p>
			<h2 className="mt-6 text-xl font-semibold text-sky-900">
				Information Collection
			</h2>
			<p className="mt-2 text-sky-800">
				We collect information that you provide directly to us, as well as
				information that is collected automatically when you use our services.
			</p>
			<h2 className="mt-6 text-xl font-semibold text-sky-900">
				Usage of Information
			</h2>
			<p className="mt-2 text-sky-800">
				We use your information to provide, maintain, and improve our services,
				as well as to communicate with you.
			</p>
		</div>
	);
};

export default PrivacyPolicy;