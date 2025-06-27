const HomePage = () => {
	return (
		<div className="space-y-6">
			<div className="bg-white rounded-lg shadow-sm p-6">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">
					歡迎來到 TanStack Query 練習專案
				</h1>
				<p className="text-gray-600 text-lg">
					這是一個用於學習和實踐 React + TanStack Query 的專案。
					在這裡您可以探索現代前端開發的各種技術。
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white rounded-lg shadow-sm p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">
						🚀 React 19
					</h3>
					<p className="text-gray-600">
						使用最新版本的 React，體驗最新的功能和改進。
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">
						⚡ TanStack Query
					</h3>
					<p className="text-gray-600">
						強大的資料取得和狀態管理函式庫，讓 API 請求變得更簡單。
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">
						🎨 Tailwind CSS
					</h3>
					<p className="text-gray-600">
						實用優先的 CSS 框架，快速建構美觀的使用者介面。
					</p>
				</div>
			</div>

			<div className="bg-blue-50 rounded-lg p-6">
				<h2 className="text-xl font-semibold text-blue-900 mb-3">開始探索</h2>
				<p className="text-blue-700 mb-4">
					準備好開始您的學習之旅了嗎？探索我們的功能和範例。
				</p>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
					開始學習
				</button>
			</div>
		</div>
	);
};

export default HomePage;
