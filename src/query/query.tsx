import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookApi } from "../api/api";
import type { Book } from "../api/types/api.types";

/**
 * 查詢金鑰工廠函式 - 遵循 tkdodo 的最佳實踐統一管理 query keys
 *
 * 結構設計原則：
 * 1. 從最通用到最具體的層級結構（['books'] -> ['books', 'list'] -> ['books', 'list', {filters}]）
 * 2. 每個層級都可獨立存取，支援靈活的快取操作（invalidation、prefetch 等）
 * 3. 避免手動宣告 key 時的錯誤，讓未來變更更容易維護
 * 4. 支援 Query Filters 的模糊匹配，方便批次操作快取
 *
 * 使用範例：
 * - bookKeys.all 可移除所有書籍相關快取
 * - bookKeys.lists() 可失效所有列表查詢
 * - bookKeys.detail(id) 可針對特定書籍操作
 */
export const bookKeys = {
	all: ["books"] as const,
	lists: () => [...bookKeys.all, "list"] as const,
	list: (filters: string) => [...bookKeys.lists(), { filters }] as const,
	details: () => [...bookKeys.all, "detail"] as const,
	detail: (id: number) => [...bookKeys.details(), id] as const,
};

// 取得所有書籍的 hook
export const useBooksQuery = (queryString?: string) => {
	return useQuery<Book[]>({
		queryKey: bookKeys.list(queryString || ""),
		queryFn: () => bookApi.getAll(queryString),
		// 根據 tkdodo 建議，設定合理的 staleTime
		staleTime: 5 * 60 * 1000, // 5 分鐘
	});
};

// 取得單一書籍的 hook
export const useBookQuery = (id: number, enabled = true) => {
	return useQuery<Book>({
		queryKey: bookKeys.detail(id),
		queryFn: () => bookApi.getById(id),
		// 利用 enabled 選項控制何時執行查詢 - tkdodo 推薦的強大功能
		enabled: enabled && !!id,
		staleTime: 5 * 60 * 1000,
	});
};

// 新增書籍的 mutation hook
export const useCreateBookMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<Book, Error, Omit<Book, "id">>({
		mutationFn: (bookData: Omit<Book, "id">) => bookApi.create(bookData),
		onSuccess: () => {
			// 成功後使所有書籍列表失效 - 遵循 tkdodo 的快取更新策略
			queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
		},
		onError: (error) => {
			console.error("新增書籍失敗：", error);
		},
	});
};

// 更新書籍的 mutation hook
export const useUpdateBookMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<Book, Error, { id: number; data: Partial<Book> }>({
		mutationFn: ({ id, data }: { id: number; data: Partial<Book> }) =>
			bookApi.update(id, data),
		onSuccess: (_, { id }) => {
			// 使特定書籍和列表查詢失效
			queryClient.invalidateQueries({ queryKey: bookKeys.detail(id) });
			queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
		},
		onError: (error) => {
			console.error("更新書籍失敗：", error);
		},
	});
};

// 刪除書籍的 mutation hook
export const useDeleteBookMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, number>({
		mutationFn: (id: number) => bookApi.delete(id),
		onSuccess: (_, id) => {
			// 移除特定書籍快取並使列表失效
			queryClient.removeQueries({ queryKey: bookKeys.detail(id) });
			queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
		},
		onError: (error) => {
			console.error("刪除書籍失敗：", error);
		},
	});
};

// 預填充書籍詳情的工具函式 - 靈感來自 tkdodo 的快取優化策略
export const usePrefetchBook = () => {
	const queryClient = useQueryClient();

	return (id: number) => {
		queryClient.prefetchQuery({
			queryKey: bookKeys.detail(id),
			queryFn: () => bookApi.getById(id),
			staleTime: 5 * 60 * 1000,
		});
	};
};
