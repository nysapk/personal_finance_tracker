import Link from "next/link";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-sky-200 border-t border-sky-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col md:flex-row justify-between">
					<div className="mb-8 md:mb-0">
						<div className="flex items-center">
							{/*} <Image
                src="/images/your-logo.png"
                alt="FinanceTracker Logo"
                width={32}
                height={32}
                className="h-8 w-auto" 
              /> */}
							<span className="ml-2 text-xl font-bold text-sky-900">
								FinanceTracker
							</span>
						</div>
						<p className="mt-2 text-sm text-sky-800 max-w-xs">
							Empowering you to take control of your finances with easy tracking
							and smart budgeting.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16">
						<div>
							<h3 className="text-lg font-semibold mb-4 text-sky-900">
								Company
							</h3>
							<ul className="space-y-2">
								<li>
									<FooterLink href="/">Home</FooterLink>
								</li>
								<li>
									<FooterLink href="/about">About Us</FooterLink>
								</li>
								<li>
									<FooterLink href="/contact">Contact</FooterLink>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4 text-sky-900">
								Platform
							</h3>
							<ul className="space-y-2">
								<li>
									<FooterLink href="/docs">Documentation</FooterLink>
								</li>
								<li>
									<FooterLink href="/dashboard">Dashboard</FooterLink>
								</li>
								<li>
									<FooterLink href="/status">Status</FooterLink>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4 text-sky-900">Legal</h3>
							<ul className="space-y-2">
								<li>
									<FooterLink href="/privacy">Privacy Policy</FooterLink>
								</li>
								<li>
									<FooterLink href="/terms">Terms of Service</FooterLink>
								</li>
								<li>
									<FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
								</li>
								<li>
									<FooterLink href="/dmca">DMCA Policy</FooterLink>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-sky-300 text-center text-sm text-sky-800">
					© {new Date().getFullYear()} FinanceTracker. All rights reserved.
				</div>
			</div>
		</footer>
	);
}

function FooterLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="text-sky-700 hover:text-sky-900 transition-colors"
		>
			{children}
		</Link>
	);
}