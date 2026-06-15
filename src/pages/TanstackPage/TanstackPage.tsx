import { useState, useCallback } from "react";
import {
	useBooksQuery,
	useBookQuery,
	useDeleteBookMutation,
	useUpdateBookMutation,
	useCreateBookMutation,
	usePrefetchBook,
} from "../../query/query";
import type { Book } from "../../api/types/api.types";
import type { BookEditFormData } from "../../schemas/bookSchema";
import { SearchFilter, BookList, BookDetailPanel } from "./components";
import Notifications from "../../components/Notifications";

// 通知類型
type NotificationType = "success" | "error";
interface Notification {
	id: string;
	type: NotificationType;
	message: string;
}

// 穩定的空陣列參照 - 避免 data 為 undefined 時每次 render 都建立新陣列而破壞子元件 memo
const EMPTY_BOOKS: Book[] = [];

const TanstackPage = () => {
	// 本地狀態管理 - 遵循 tkdodo 的建議，保持 server state 和 client state 分離
	const [searchFilter, setSearchFilter] = useState("");
	const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
	const [editingBook, setEditingBook] = useState<Book | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	// React Query hooks - 使用自訂 hooks，遵循 tkdodo 建議
	const {
		data: booksData,
		isLoading: booksLoading,
		error: booksError,
	} = useBooksQuery(searchFilter ? `title_like=${searchFilter}` : undefined);

	// 以穩定的空陣列作為預設值，避免每次 render 都產生新參照
	const books = booksData ?? EMPTY_BOOKS;

	// 利用 enabled 選項控制何時執行查詢 - tkdodo 推薦的強大功能
	const { data: selectedBook, isLoading: bookLoading } = useBookQuery(
		selectedBookId!,
		!!selectedBookId
	);

	// Mutation hooks - 解構出參照穩定的 mutateAsync、isPending 與 variables
	const {
		mutateAsync: deleteBook,
		isPending: isDeleting,
		variables: deleteVariables, // number | undefined
	} = useDeleteBookMutation();
	const {
		mutateAsync: updateBook,
		isPending: isUpdating,
		variables: updateVariables, // { id, data } | undefined
	} = useUpdateBookMutation();
	const { mutateAsync: createBook, isPending: isCreatePending } =
		useCreateBookMutation();

	// 正在被刪除 / 更新的書籍 id（無進行中則為 null）
	// 讓 pending 狀態只作用在被操作的那一本書，避免整列 BookItem 一起重新渲染
	const deletingBookId = isDeleting ? deleteVariables ?? null : null;
	const updatingBookId = isUpdating ? updateVariables?.id ?? null : null;

	// 預填充函式（hook 內已用 useCallback 穩定參照）
	const prefetchBook = usePrefetchBook();

	// 通知系統輔助函式 - useCallback 穩定參照，避免下傳時破壞子元件 memo
	const showNotification = useCallback(
		(type: NotificationType, message: string) => {
			const id = Date.now().toString();
			setNotifications((prev) => [...prev, { id, type, message }]);

			// 3 秒後自動移除通知
			setTimeout(() => {
				setNotifications((prev) =>
					prev.filter((notification) => notification.id !== id)
				);
			}, 3000);
		},
		[]
	);

	// 移除通知
	const removeNotification = useCallback((id: string) => {
		setNotifications((prev) =>
			prev.filter((notification) => notification.id !== id)
		);
	}, []);

	// 處理書籍刪除 - 以函式式更新讀取 selectedBookId，避免將其納入依賴而頻繁重建回呼
	const handleDeleteBook = useCallback(
		async (id: number) => {
			if (window.confirm("確定要刪除這本書嗎？")) {
				try {
					await deleteBook(id);
					setSelectedBookId((prev) => (prev === id ? null : prev));
				} catch (error) {
					console.error("刪除書籍失敗：", error);
				}
			}
		},
		[deleteBook]
	);

	// 開始編輯書籍
	const handleEditBook = useCallback((book: Book) => {
		setEditingBook(book);
	}, []);

	// 取消編輯
	const handleCancelEdit = useCallback(() => {
		setEditingBook(null);
	}, []);

	// 處理更新書籍 - 接收 React Hook Form 的資料
	const handleUpdateBook = useCallback(
		async (formData: BookEditFormData) => {
			if (!editingBook) return;

			try {
				await updateBook({
					id: editingBook.id,
					data: formData,
				});
				setEditingBook(null);
				// 成功提示
				showNotification("success", "書籍更新成功！");
			} catch (error) {
				console.error("更新書籍失敗：", error);
				showNotification("error", "更新失敗，請稍後再試");
			}
		},
		[editingBook, updateBook, showNotification]
	);

	// 處理搜尋功能
	const handleSearch = useCallback((searchTerm: string) => {
		setSearchFilter(searchTerm);
	}, []);

	// 開始新增書籍
	const handleCreateBook = useCallback(() => {
		setIsCreating(true);
		setEditingBook(null); // 確保編輯模式關閉
		setSelectedBookId(null); // 清除選擇的書籍
	}, []);

	// 處理新增書籍 - 接收 React Hook Form 的資料
	const handleSubmitCreateBook = useCallback(
		async (formData: BookEditFormData) => {
			try {
				// 將表單資料轉換為完整的書籍創建資料
				const createBookData = {
					...formData,
					// 新增時需要提供的額外欄位
					authorId: 1, // 預設作者 ID
					categoryId: 1, // 預設分類 ID
					originalPrice: formData.price, // 原價等於價格
					coverImage: "", // 空的封面圖片
					reviews: 0, // 預設評論數為 0
					isRecommended: false, // 預設不推薦
				};
				await createBook(createBookData);
				setIsCreating(false);
				// 成功提示
				showNotification("success", "書籍新增成功！");
			} catch (error) {
				console.error("新增書籍失敗：", error);
				showNotification("error", "新增失敗，請稍後再試");
			}
		},
		[createBook, showNotification]
	);

	// 取消新增書籍
	const handleCancelCreate = useCallback(() => {
		setIsCreating(false);
	}, []);

	return (
		<>
			<Notifications
				notifications={notifications}
				removeNotification={removeNotification}
			/>
			{booksError ? (
				<div className="text-red-500">
					載入書籍時發生錯誤：{(booksError as Error).message}
				</div>
			) : (
				<div className="tanstack-page p-5 max-w-6xl mx-auto">
					<h1 className="text-3xl font-bold">React Query 書籍管理範例</h1>
					<p className="text-gray-600 mb-5">
						遵循 tkdodo 最佳實踐的 React Query 實作範例
					</p>

					<SearchFilter onSearch={handleSearch} />

					<div className="grid grid-cols-2 gap-5">
						<BookList
							books={books}
							isLoading={booksLoading}
							selectedBookId={selectedBookId}
							deletingBookId={deletingBookId}
							updatingBookId={updatingBookId}
							onSelectBook={setSelectedBookId}
							onEditBook={handleEditBook}
							onDeleteBook={handleDeleteBook}
							onBookHover={prefetchBook}
							onCreateBook={handleCreateBook}
						/>

						<BookDetailPanel
							selectedBookId={selectedBookId}
							selectedBook={selectedBook}
							isBookLoading={bookLoading}
							editingBook={editingBook}
							isUpdatePending={isUpdating}
							onUpdate={handleUpdateBook}
							onCancel={handleCancelEdit}
							isCreating={isCreating}
							isCreatePending={isCreatePending}
							onCreate={handleSubmitCreateBook}
							onCancelCreate={handleCancelCreate}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default TanstackPage;
