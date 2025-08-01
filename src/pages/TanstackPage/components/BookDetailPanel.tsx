import type { Book } from "../../../api/types/api.types";
import type { BookEditFormData } from "../../../schemas/bookSchema";
import BookDetails from "./BookDetails";
import BookEditForm from "./BookEditForm";

interface BookDetailsRendererProps {
	selectedBook: Book | undefined;
	isBookLoading: boolean;
}

const BookDetailsRenderer = ({
	selectedBook,
	isBookLoading,
}: BookDetailsRendererProps) => {
	const Loading = () => <div>載入詳情中...</div>;

	const BookNotFound = () => (
		<div className="p-5 text-center text-gray-600">找不到該書籍</div>
	);
	if (isBookLoading) return <Loading />;
	return selectedBook ? <BookDetails book={selectedBook} /> : <BookNotFound />;
};

interface BookDetailPanelProps {
	selectedBookId: number | null;
	selectedBook: Book | undefined;
	isBookLoading: boolean;
	editingBook: Book | null;
	isUpdatePending: boolean;
	onUpdate: (data: BookEditFormData) => void;
	onCancel: () => void;
}

const BookDetailPanel = ({
	selectedBookId,
	selectedBook,
	isBookLoading,
	editingBook,
	isUpdatePending,
	onUpdate,
	onCancel,
}: BookDetailPanelProps) => {
	const renderEmptyState = () => (
		<div className="p-5 text-center text-gray-600">請選擇一本書查看詳情</div>
	);

	const renderDetailView = () => (
		<div>
			<h2 className="text-xl font-semibold mb-3">書籍詳情</h2>
			{selectedBookId ? (
				<BookDetailsRenderer
					selectedBook={selectedBook}
					isBookLoading={isBookLoading}
				/>
			) : (
				renderEmptyState()
			)}
		</div>
	);

	const renderEditView = () => (
		<BookEditForm
			initialData={editingBook!}
			isUpdatePending={isUpdatePending}
			onSubmit={onUpdate}
			onCancel={onCancel}
		/>
	);

	return <div>{editingBook ? renderEditView() : renderDetailView()}</div>;
};

export default BookDetailPanel;
