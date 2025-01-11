import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="font-sans antialiased bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300 min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-full max-w-7xl px-6 lg:px-20">
        {/* Header */}
        <header className="grid grid-cols-2 items-center gap-4 py-10 lg:grid-cols-3">
          <div className="flex justify-center lg:col-start-2">
            <h1 className="text-3xl font-bold text-[#5C6BC0]">
              Delicious Recipes
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex justify-end space-x-4">
            {/* Replace these links with actual routes */}
            <Link
              to="/dashboard"
              className="rounded-md px-6 py-2 bg-[#5C6BC0] text-white hover:bg-[#3F4C79] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6BC0]"
            >
              Dashboard
            </Link>
            <Link
              to="login"
              className="rounded-md px-6 py-2 bg-[#5C6BC0] text-white hover:bg-[#3F4C79] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6BC0]"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-md px-6 py-2 bg-[#5C6BC0] text-white hover:bg-[#3F4C79] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6BC0]"
            >
              Register
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="mt-6">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl px-6 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 transition duration-300 hover:ring-[#5C6BC0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6BC0]">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Featured Recipes
              </h2>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Discover our most popular and delicious recipes, perfect for
                any occasion.
              </p>
              <Link
                to="/recipes/best"
                className="text-blue-600 hover:text-blue-800 underline transition duration-300 ease-in-out"
              >
                The Best Recipes
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-16 text-center text-sm text-gray-600 dark:text-gray-400">
          Built with Remix & TailwindCSS
        </footer>
      </div>
    </div>
  );
}
