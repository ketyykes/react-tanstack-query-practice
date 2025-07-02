// 型別定義
export interface Book {
	id: number;
	title: string;
	author: string;
	authorId: number;
	categoryId: number;
	price: number;
	originalPrice: number;
	isbn: string;
	publisher: string;
	publishDate: string;
	pages: number;
	language: string;
	description: string;
	coverImage: string;
	stock: number;
	rating: number;
	reviews: number;
	isRecommended: boolean;
}
