// pages/dmca.tsx
import React from "react";

const DMCA = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold text-sky-900">DMCA Policy</h1>
			<p className="mt-4 text-sky-800">
				We respect the intellectual property of others and expect our users to
				do the same. This DMCA policy outlines our procedures for handling
				claims of copyright infringement.
			</p>
			<h2 className="mt-6 text-xl font-semibold text-sky-900">
				Filing a DMCA Notice
			</h2>
			<p className="mt-2 text-sky-800">
				If you believe that any material on our website infringes your
				copyright, please provide us with a written notification that includes
				the following:
			</p>
			<ul className="mt-2 list-disc list-inside text-sky-800">
				<li>Your contact information</li>
				<li>
					A description of the copyrighted work you believe has been infringed
				</li>
				<li>
					A description of where the material you claim is infringing is located
					on our site
				</li>
				<li>
					A statement that you have a good faith belief that the use of the
					material is not authorized by the copyright owner
				</li>
				<li>A statement that the information in your notice is accurate</li>
			</ul>
		</div>
	);
};

export default DMCA;