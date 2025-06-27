import type { Book } from "../../../api/types/api.types";

interface BookDetailsProps {
	book: Book;
}

const BookDetails = ({ book }: BookDetailsProps) => {
	return (
		<div className="border border-gray-300 rounded p-4">
			<h3 className="text-lg font-semibold mb-3">{book.title}</h3>
			<p className="mb-2">
				<strong>作者：</strong> {book.author}
			</p>
			<p className="mb-2">
				<strong>出版社：</strong> {book.publisher}
			</p>
			<p className="mb-2">
				<strong>出版日期：</strong> {book.publishDate}
			</p>
			<p className="mb-2">
				<strong>頁數：</strong> {book.pages}
			</p>
			<p className="mb-2">
				<strong>價格：</strong> NT${book.price}
			</p>
			<p className="mb-2">
				<strong>ISBN:</strong> {book.isbn}
			</p>
			<p className="mb-2">
				<strong>語言：</strong> {book.language}
			</p>
			<p className="mb-2">
				<strong>評分：</strong> {book.rating} ({book.reviews} 評論)
			</p>
			<p className="mb-2">
				<strong>庫存：</strong> {book.stock}
			</p>
			<p className="mb-2">
				<strong>描述：</strong> {book.description}
			</p>
			<p className="mb-2">
				<strong>標籤：</strong> {book.tags.join(", ")}
			</p>
		</div>
	);
};

export default BookDetails;
