import type { Book } from "../../../api/types/api.types";
import BookItem from "./BookItem";

interface BookListProps {
	books: Book[];
	isLoading: boolean;
	selectedBookId: number | null;
	isDeletePending: boolean;
	isUpdatePending: boolean;
	onSelectBook: (id: number) => void;
	onEditBook: (book: Book) => void;
	onDeleteBook: (id: number) => void;
	onBookHover: (id: number) => void;
	onCreateBook: () => void;
}

const BookList = ({
	books,
	isLoading,
	selectedBookId,
	isDeletePending,
	isUpdatePending,
	onSelectBook,
	onEditBook,
	onDeleteBook,
	onBookHover,
	onCreateBook,
}: BookListProps) => {
	const renderLoadingState = () => <div>載入中...</div>;

	const renderEmptyState = () => (
		<div className="p-5 text-center text-gray-600">沒有找到符合條件的書籍</div>
	);

	const renderBookItems = () =>
		books.map((book: Book) => (
			<BookItem
				key={book.id}
				book={book}
				isSelected={selectedBookId === book.id}
				isDeletePending={isDeletePending}
				isUpdatePending={isUpdatePending}
				onSelect={onSelectBook}
				onEdit={onEditBook}
				onDelete={onDeleteBook}
				onBookHover={onBookHover}
			/>
		));

	const renderContent = () => {
		if (books.length === 0) return renderEmptyState();
		return renderBookItems();
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-xl font-semibold">書籍列表</h2>
				<button
					type="button"
					onClick={onCreateBook}
					className="py-2 px-4 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
				>
					新增書籍
				</button>
			</div>
			{isLoading ? (
				renderLoadingState()
			) : (
				<div className="border border-gray-300 rounded">{renderContent()}</div>
			)}
		</div>
	);
};

export default BookList;
