import axios from "axios";
import type { Book } from "./types/api.types";

// 基礎 URL 設定
const baseUrl = "http://localhost:3004";

// 建立公開服務實例（不需要認證）
const publicService = axios.create({
	baseURL: `${baseUrl}`,
});

// 公開服務回應攔截器
publicService.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (error.response) {
			if (error.response.status === 404) {
				console.error(error);
				console.error("請求的資源不存在");
			} else if (error.response.status === 500) {
				console.error(error);
				console.error("伺服器發生錯誤");
			} else {
				console.error(error);
				console.error("發生未預期的錯誤");
			}
		}
		return Promise.reject(error);
	}
);

// 路由工廠函式 - 產生 URL 字串
const bookQueryRouteCreator = (queryString?: string) => {
	const routeUrl = `/books`;
	return queryString ? `${routeUrl}?${queryString}` : routeUrl;
};

const bookDetailRouteCreator = (id: string | number) => `/books/${id}`;

const bookAddRouteCreator = () => `/books`;

const bookUpdateRouteCreator = (id: string | number) => `/books/${id}`;

const bookRemoveRouteCreator = (id: string | number) => `/books/${id}`;

// 書籍 API 函式
export const bookApi = {
	// 1. 取得全部書籍（可選擇性帶入 query string）
	getAll: (queryString?: string): Promise<Book[]> =>
		publicService.get(bookQueryRouteCreator(queryString)),

	// 2. 取得特定 ID 的書籍
	getById: (id: number): Promise<Book> =>
		publicService.get(bookDetailRouteCreator(id)),

	// 3. 新增書籍
	create: (bookData: Omit<Book, "id">): Promise<Book> =>
		publicService.post(bookAddRouteCreator(), bookData),

	// 4. 更新書籍
	update: (id: number, bookData: Partial<Book>): Promise<Book> =>
		publicService.put(bookUpdateRouteCreator(id), bookData),

	// 5. 刪除書籍
	delete: (id: number): Promise<void> =>
		publicService.delete(bookRemoveRouteCreator(id)),
};

// 匯出服務實例
export { publicService };

// 預設匯出
export default bookApi;
