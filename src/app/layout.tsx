"use client";

import Image from "next/image";
import Navbar from "./navbar";
import Footer from "./footer";
import { SessionProvider } from "next-auth/react";
import { TrpcProvider } from "@/lib/trpc-provider";
import "../styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<TrpcProvider>
			<html lang="en">
				<body>
					<SessionProvider>
						<div className="flex flex-col min-h-screen">
							<Navbar />
							<div className="flex-grow">
								<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
									{children}
								</main>
							</div>
							<Footer />
						</div>
					</SessionProvider>
				</body>
			</html>
		</TrpcProvider>
	);
}

// app/layout.tsx
/*
import { TrpcProvider } from "~/lib/trpc-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<TrpcProvider>
			<html lang="en-US">
				<head>{/* snip */ /*}</head>
				<body>{children}</body>
			</html>
		</TrpcProvider>
	);
} */