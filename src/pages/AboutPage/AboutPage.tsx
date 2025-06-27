const AboutPage = () => {
	return (
		<div className="space-y-8">
			<div className="bg-white rounded-lg shadow-sm p-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">
					關於我們的專案
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed">
					這個專案是為了學習和實踐現代前端開發技術而建立的。
					我們專注於使用最新的工具和最佳實踐來建構高品質的網頁應用程式。
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white rounded-lg shadow-sm p-6">
					<h2 className="text-2xl font-semibold text-gray-900 mb-4">
						🎯 專案目標
					</h2>
					<ul className="space-y-3 text-gray-600">
						<li className="flex items-start">
							<span className="text-blue-500 mr-2">•</span>
							學習 React 19 的最新功能
						</li>
						<li className="flex items-start">
							<span className="text-blue-500 mr-2">•</span>
							掌握 TanStack Query 的使用方法
						</li>
						<li className="flex items-start">
							<span className="text-blue-500 mr-2">•</span>
							實踐 TypeScript 開發
						</li>
						<li className="flex items-start">
							<span className="text-blue-500 mr-2">•</span>
							建構響應式使用者介面
						</li>
					</ul>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6">
					<h2 className="text-2xl font-semibold text-gray-900 mb-4">
						🛠️ 技術堆疊
					</h2>
					<div className="space-y-4">
						<div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
							<span className="font-medium">React</span>
							<span className="text-sm text-gray-500">v19.1.0</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
							<span className="font-medium">TanStack Query</span>
							<span className="text-sm text-gray-500">v5.81.2</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
							<span className="font-medium">TypeScript</span>
							<span className="text-sm text-gray-500">v5.8.3</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
							<span className="font-medium">Tailwind CSS</span>
							<span className="text-sm text-gray-500">v4.1.11</span>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
				<h2 className="text-2xl font-semibold mb-4">加入我們的學習之旅</h2>
				<p className="text-blue-100 mb-6">
					無論您是前端開發新手還是經驗豐富的開發者，
					這個專案都能為您提供寶貴的學習資源和實踐機會。
				</p>
				<div className="flex flex-col sm:flex-row gap-4">
					<button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200">
						查看文件
					</button>
					<button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200">
						GitHub 專案
					</button>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
