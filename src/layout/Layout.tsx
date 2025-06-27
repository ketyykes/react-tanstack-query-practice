import { type ReactNode } from "react";
import { Link, useLocation } from "react-router";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const location = useLocation();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Header with Navigation */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="py-4">
						<div className="flex space-x-8">
							<Link
								to="/"
								className={`inline-flex items-center px-1 py-2 border-b-2 text-sm font-medium transition-colors duration-200 ${
									isActive("/")
										? "border-blue-500 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								首頁
							</Link>
							<Link
								to="/about"
								className={`inline-flex items-center px-1 py-2 border-b-2 text-sm font-medium transition-colors duration-200 ${
									isActive("/about")
										? "border-blue-500 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								關於我們
							</Link>
							<Link
								to="/tanstack"
								className={`inline-flex items-center px-1 py-2 border-b-2 text-sm font-medium transition-colors duration-200 ${
									isActive("/tanstack")
										? "border-blue-500 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								TanStack
							</Link>
						</div>
					</nav>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					{children}
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white">
				<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* 公司資訊 */}
						<div>
							<h3 className="text-lg font-semibold mb-4">關於專案</h3>
							<p className="text-gray-300 text-sm">
								這是一個 React + TanStack Query 的練習專案，
								用於學習現代前端開發技術。
							</p>
						</div>

						{/* 快速連結 */}
						<div>
							<h3 className="text-lg font-semibold mb-4">快速連結</h3>
							<ul className="space-y-2">
								<li>
									<Link
										to="/"
										className="text-gray-300 hover:text-white transition-colors duration-200"
									>
										首頁
									</Link>
								</li>
								<li>
									<Link
										to="/about"
										className="text-gray-300 hover:text-white transition-colors duration-200"
									>
										關於我們
									</Link>
								</li>
							</ul>
						</div>

						{/* 技術資訊 */}
						<div>
							<h3 className="text-lg font-semibold mb-4">使用技術</h3>
							<ul className="text-gray-300 text-sm space-y-1">
								<li>React 19</li>
								<li>TanStack Query</li>
								<li>TypeScript</li>
								<li>Tailwind CSS</li>
								<li>Vite</li>
							</ul>
						</div>
					</div>

					{/* 版權資訊 */}
					<div className="mt-8 pt-8 border-t border-gray-700">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<p className="text-gray-400 text-sm">
								© 2024 TanStack Query 練習專案。保留所有權利。
							</p>
							<div className="flex space-x-6 mt-4 md:mt-0">
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors duration-200"
								>
									隱私政策
								</a>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors duration-200"
								>
									服務條款
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
