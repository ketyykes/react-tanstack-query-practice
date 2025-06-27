import type { Book } from "../../../api/types/api.types";

interface BookItemProps {
	book: Book;
	isSelected: boolean;
	isDeletePending: boolean;
	isUpdatePending: boolean;
	onSelect: (id: number) => void;
	onEdit: (book: Book) => void;
	onDelete: (id: number) => void;
	onBookHover: (id: number) => void;
}

const BookItem = ({
	book,
	isSelected,
	isDeletePending,
	isUpdatePending,
	onSelect,
	onEdit,
	onDelete,
	onBookHover,
}: BookItemProps) => {
	const getItemClassName = () => {
		const baseClass =
			"p-3 border-1 border-gray-100 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-400 hover:border-2 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:-translate-y-1 rounded-lg";
		const selectedClass = isSelected ? "bg-blue-200" : "bg-transparent";
		return `${baseClass} ${selectedClass}`;
	};

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		onEdit(book);
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete(book.id);
	};

	return (
		<div
			className={getItemClassName()}
			onClick={() => onSelect(book.id)}
			onMouseEnter={() => onBookHover(book.id)}
		>
			<div className="font-bold">{book.title}</div>
			<div className="text-sm text-gray-600">
				作者：{book.author} | 出版社：{book.publisher}
			</div>
			<div className="text-sm text-gray-600">
				價格：NT${book.price} | 頁數：{book.pages}
			</div>
			<div className="mt-2 flex gap-2">
				<button
					onClick={handleEdit}
					className="py-1 px-2 bg-blue-600 text-white border-none rounded text-xs cursor-pointer disabled:opacity-50 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:scale-105"
					disabled={isUpdatePending}
				>
					編輯
				</button>
				<button
					onClick={handleDelete}
					className="py-1 px-2 bg-red-600 text-white border-none rounded text-xs cursor-pointer disabled:opacity-50 transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:scale-105"
					disabled={isDeletePending}
				>
					{isDeletePending ? "刪除中..." : "刪除"}
				</button>
			</div>
		</div>
	);
};

export default BookItem;
