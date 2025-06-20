"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, UserCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Navbar() {
	const { data: sessionData } = useSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const router = useRouter();

	const handleSignOut = () => {
		signOut({ callbackUrl: "/" });
	};

	return (
		<nav className="bg-sky-200 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex-shrink-0 flex items-center">
							<span className="ml-2 text-xl font-bold text-sky-900">
								FinanceTracker
							</span>
						</Link>
						<div className="hidden md:block ml-10">
							<div className="flex items-baseline space-x-4">
								<NavLink href="/about">About Us</NavLink>
								<NavLink href="/dashboard">Dashboard</NavLink>
							</div>
						</div>
					</div>
					<div className="hidden md:block">
						{sessionData?.user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="w-10 h-10 rounded-full p-0"
									>
										<UserCircle className="h-6 w-6" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onSelect={() => router.push("/profile")}>
										Profile
									</DropdownMenuItem>
									<DropdownMenuItem onSelect={handleSignOut}>
										Sign Out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button
								onClick={() => void signIn("discord")}
								className="bg-sky-600 hover:bg-sky-700 text-white"
							>
								Sign In
							</Button>
						)}
					</div>
					<div className="md:hidden">
						<button
							type="button"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-sky-900 hover:text-sky-600 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
						>
							<span className="sr-only">Open main menu</span>
							{isMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{isMenuOpen && (
				<div className="md:hidden bg-sky-200">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<NavLink href="/about" mobile>
							About Us
						</NavLink>
						<NavLink href="/dashboard" mobile>
							Dashboard
						</NavLink>
					</div>
					<div className="pt-4 pb-3 border-t border-sky-300">
						<div className="px-2">
							{sessionData?.user ? (
								<>
									<div className="flex items-center px-3 py-2">
										<UserCircle className="h-8 w-8 text-sky-900" />
										<span className="ml-3 text-sky-900">
											{sessionData.user.name}
										</span>
									</div>
									<Button
										onClick={handleSignOut}
										className="mt-2 w-full bg-sky-600 hover:bg-sky-700 text-white"
									>
										Sign Out
									</Button>
								</>
							) : (
								<Button
									onClick={() => void signIn("discord")}
									className="w-full bg-sky-600 hover:bg-sky-700 text-white"
								>
									Sign In
								</Button>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}

function NavLink({
	href,
	children,
	mobile = false,
}: {
	href: string;
	children: React.ReactNode;
	mobile?: boolean;
}) {
	const baseClasses = "text-sky-900 hover:text-sky-700 hover:bg-sky-300";
	const desktopClasses = "px-3 py-2 rounded-md text-sm font-medium";
	const mobileClasses = "block px-3 py-2 rounded-md text-base font-medium";

	return (
		<Link
			href={href}
			className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
		>
			{children}
		</Link>
	);
}