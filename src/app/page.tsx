import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
	// const query = await api.expense.hello({ text: "Hello World" });
	//console.log(query);
	console.log("test");
	const session = await getServerAuthSession();
	console.log(session);

	return (
		<>
			<div className="bg-sky-100 py-12 border-b border-sky-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="md:w-1/2 mb-8 md:mb-0">
							<h1 className="text-4xl font-bold text-sky-900 mb-4">
								Your Personal Finance Dashboard {/*{query.greeting}*/}
							</h1>
							<p className="text-xl text-sky-700">
								Take control of your finances today with our free finance
								tracker. Plan, track, and visualize your financial health with
								ease.
							</p>
						</div>
						<div className="md:w-1/2 flex justify-center">
							<img
								src="/undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_users_per_minute_1e4q_t22j_-1-_0ngf_-1-_27dv_30ul_legv_-1-_il1l_-2-_0jip (1).svg"
								alt="Users"
								style={{ width: "500px", height: "450px" }}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* About*/}
			<div className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">
						About Our App
					</h2>
					<p className="text-lg text-sky-700 text-center max-w-3xl mx-auto">
						Our finance tracker helps you organize your budget, track expenses,
						and gain insights into your spending habits. With features like
						income tracking, data visualization, and report generation, you can
						confidently shape your financial future for the better.
					</p>
				</div>
			</div>
			{/* Features*/}
			<div className="bg-sky-50 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-12 text-center">
						Key Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								Budget Planning
							</h3>
							<p className="text-sky-600">
								Create a personalized monthly budget and categorize your
								expenses to stay on track with your financial goals.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								Expense Tracking
							</h3>
							<p className="text-sky-600">
								Easily log and categorize your daily expenses to gain a clear
								understanding of where your money is going.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								Income Management
							</h3>
							<p className="text-sky-600">
								Track your income from multiple sources and ensure you're
								meeting your savings and spending targets.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								Data Visualization
							</h3>
							<p className="text-sky-600">
								View your financial data with easy-to-understand charts and
								graphs that help you analyze your spending patterns.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								Report Generation
							</h3>
							<p className="text-sky-600">
								Generate comprehensive reports to understand your financial
								health and make better decisions based on detailed data
								insights.
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* How It Works*/}
			<div className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-sky-900 mb-12 text-center">
						How It Works
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="bg-sky-50 p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								1. Sign Up
							</h3>
							<p className="text-sky-600">
								Create your account in just a few clicks and set up your profile
								to begin tracking your finances.
							</p>
						</div>

						<div className="bg-sky-50 p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								2. Set Your Budget
							</h3>
							<p className="text-sky-600">
								Define your monthly budget by allocating spending categories and
								goals for your expenses and savings.
							</p>
						</div>

						<div className="bg-sky-50 p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								3. Track Your Expenses
							</h3>
							<p className="text-sky-600">
								Record your expenses as they happen and categorize them for easy
								tracking and analysis.
							</p>
						</div>

						<div className="bg-sky-50 p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-sky-800 mb-4">
								4. Visualize and Analyze
							</h3>
							<p className="text-sky-600">
								Use our data visualizations and reports to understand your
								spending patterns and improve your financial health.
							</p>
						</div>
					</div>
				</div>
			</div>{" "}
			{/*
      <div className="flex min-h-screen flex-col justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Finance Tracker</h1>
            <div>
              <Link href="/" className="text-white mr-4">Home</Link>
              <Link href="/budget" className="text-white mr-4">Budget</Link>
              <Link href="/income" className="text-white mr-4">Income</Link>
              <Link href="/expenses" className="text-white">Expenses</Link>
            </div>
          </div>
        </nav>


        <main className="flex-grow flex flex-col items-center justify-center text-center">
          <div className="container flex flex-col items-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Welcome to Your <span className="text-[hsl(280,100%,70%)]">Personal Finance Tracker</span>!
            </h1>
            <p className="text-2xl">
              Here, you can track your income, budget, and expenses to stay on track with your financial goals.
            </p>
            
            <div className="flex flex-col items-center gap-4">
     f         <p className="text-2xl">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-gray-800 p-4">
          <div className="container mx-auto text-center text-white">
            &copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.
          </div>
        </footer>
      </div> */}
		</>
	);

	/*
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && session.user.id}
        </div>
      </main>
    </HydrateClient>
  ); */
}