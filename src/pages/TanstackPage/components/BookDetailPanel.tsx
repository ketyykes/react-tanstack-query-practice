import type { Book } from "../../../api/types/api.types";
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
	editForm: Partial<Book>;
	isUpdatePending: boolean;
	onFormChange: (field: keyof Book, value: string | number) => void;
	onUpdate: () => void;
	onCancel: () => void;
}

const BookDetailPanel = ({
	selectedBookId,
	selectedBook,
	isBookLoading,
	editingBook,
	editForm,
	isUpdatePending,
	onFormChange,
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
			editForm={editForm}
			isUpdatePending={isUpdatePending}
			onFormChange={onFormChange}
			onUpdate={onUpdate}
			onCancel={onCancel}
		/>
	);

	return <div>{editingBook ? renderEditView() : renderDetailView()}</div>;
};

export default BookDetailPanel;
