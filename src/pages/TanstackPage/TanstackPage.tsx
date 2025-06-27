import { useState } from "react";
import {
	useBooksQuery,
	useBookQuery,
	useDeleteBookMutation,
	useUpdateBookMutation,
	usePrefetchBook,
} from "../../query/query";
import type { Book } from "../../api/types/api.types";
import { SearchFilter, BookList, BookDetailPanel } from "./components";

const TanstackPage = () => {
	// 本地狀態管理 - 遵循 tkdodo 的建議，保持 server state 和 client state 分離
	const [searchFilter, setSearchFilter] = useState("");
	const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
	const [editingBook, setEditingBook] = useState<Book | null>(null);
	const [editForm, setEditForm] = useState<Partial<Book>>({});

	// React Query hooks - 使用自訂 hooks，遵循 tkdodo 建議
	const {
		data: books = [],
		isLoading: booksLoading,
		error: booksError,
	} = useBooksQuery(searchFilter ? `title_like=${searchFilter}` : undefined);

	// 利用 enabled 選項控制何時執行查詢 - tkdodo 推薦的強大功能
	const { data: selectedBook, isLoading: bookLoading } = useBookQuery(
		selectedBookId!,
		!!selectedBookId
	);

	// Mutation hooks
	const deleteBookMutation = useDeleteBookMutation();
	const updateBookMutation = useUpdateBookMutation();

	// 預填充函式
	const prefetchBook = usePrefetchBook();

	// 處理書籍刪除
	const handleDeleteBook = async (id: number) => {
		if (window.confirm("確定要刪除這本書嗎？")) {
			try {
				await deleteBookMutation.mutateAsync(id);
				if (selectedBookId === id) {
					setSelectedBookId(null);
				}
			} catch (error) {
				console.error("刪除書籍失敗：", error);
			}
		}
	};

	// 開始編輯書籍
	const handleEditBook = (book: Book) => {
		setEditingBook(book);
		setEditForm({
			title: book.title,
			author: book.author,
			publisher: book.publisher,
			publishDate: book.publishDate,
			price: book.price,
			pages: book.pages,
			isbn: book.isbn,
			language: book.language,
			rating: book.rating,
			stock: book.stock,
			description: book.description,
		});
	};

	// 取消編輯
	const handleCancelEdit = () => {
		setEditingBook(null);
		setEditForm({});
	};

	// 處理更新書籍
	const handleUpdateBook = async () => {
		if (!editingBook) return;

		try {
			await updateBookMutation.mutateAsync({
				id: editingBook.id,
				data: editForm,
			});
			setEditingBook(null);
			setEditForm({});
			// 成功提示
			alert("書籍更新成功！");
		} catch (error) {
			console.error("更新書籍失敗：", error);
			alert("更新失敗，請稍後再試");
		}
	};

	// 處理表單欄位變更
	const handleFormChange = (field: keyof Book, value: string | number) => {
		setEditForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// 處理滑鼠懸停時的預填充 - 優化使用者體驗
	const handleBookHover = (id: number) => {
		prefetchBook(id);
	};

	const renderErrorState = () => (
		<div className="error">
			載入書籍時發生錯誤：{(booksError as Error).message}
		</div>
	);

	const renderMainContent = () => (
		<div className="tanstack-page p-5 max-w-6xl mx-auto">
			<h1 className="text-3xl font-bold">React Query 書籍管理範例</h1>
			<p className="text-gray-600 mb-5">
				遵循 tkdodo 最佳實踐的 React Query 實作範例
			</p>

			<SearchFilter value={searchFilter} onChange={setSearchFilter} />

			<div className="grid grid-cols-2 gap-5">
				<BookList
					books={books}
					isLoading={booksLoading}
					selectedBookId={selectedBookId}
					isDeletePending={deleteBookMutation.isPending}
					isUpdatePending={updateBookMutation.isPending}
					onSelectBook={setSelectedBookId}
					onEditBook={handleEditBook}
					onDeleteBook={handleDeleteBook}
					onBookHover={handleBookHover}
				/>

				<BookDetailPanel
					selectedBookId={selectedBookId}
					selectedBook={selectedBook}
					isBookLoading={bookLoading}
					editingBook={editingBook}
					editForm={editForm}
					isUpdatePending={updateBookMutation.isPending}
					onFormChange={handleFormChange}
					onUpdate={handleUpdateBook}
					onCancel={handleCancelEdit}
				/>
			</div>
		</div>
	);

	return booksError ? renderErrorState() : renderMainContent();
};

export default TanstackPage;
