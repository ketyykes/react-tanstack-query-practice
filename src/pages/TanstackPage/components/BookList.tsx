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
			<h2 className="text-xl font-semibold mb-3">書籍列表</h2>
			{isLoading ? (
				renderLoadingState()
			) : (
				<div className="border border-gray-300 rounded">{renderContent()}</div>
			)}
		</div>
	);
};

export default BookList;
