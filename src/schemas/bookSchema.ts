import { z } from "zod";

// 書籍編輯表單的 Zod 驗證 Schema
export const bookEditSchema = z.object({
	title: z
		.string()
		.min(1, "標題為必填欄位")
		.max(200, "標題不能超過 200 個字元"),
	
	author: z
		.string()
		.min(1, "作者為必填欄位")
		.max(100, "作者名稱不能超過 100 個字元"),
	
	publisher: z
		.string()
		.min(1, "出版社為必填欄位")
		.max(100, "出版社名稱不能超過 100 個字元"),
	
	publishDate: z
		.string()
		.min(1, "出版日期為必填欄位")
		.regex(/^\d{4}-\d{2}-\d{2}$/, "請輸入有效的日期格式 (YYYY-MM-DD)"),
	
	price: z
		.number()
		.positive("價格必須大於 0")
		.max(999999, "價格不能超過 999,999"),
	
	pages: z
		.number()
		.int("頁數必須為整數")
		.positive("頁數必須大於 0")
		.max(10000, "頁數不能超過 10,000"),
	
	isbn: z
		.string()
		.min(1, "ISBN 為必填欄位")
		.regex(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, "請輸入有效的 ISBN 格式"),
	
	language: z
		.string()
		.min(1, "語言為必填欄位")
		.max(50, "語言名稱不能超過 50 個字元"),
	
	stock: z
		.number()
		.int("庫存必須為整數")
		.min(0, "庫存不能少於 0")
		.max(99999, "庫存不能超過 99,999"),
	
	rating: z
		.number()
		.min(0, "評分不能少於 0")
		.max(5, "評分不能超過 5")
		.multipleOf(0.1, "評分精確度為 0.1"),
	
	description: z
		.string()
		.min(1, "描述為必填欄位")
		.max(1000, "描述不能超過 1,000 個字元"),
});

// 從 Schema 推導出的 TypeScript 型別
export type BookEditFormData = z.infer<typeof bookEditSchema>;

// 表單預設值
export const bookEditDefaultValues: Partial<BookEditFormData> = {
	title: "",
	author: "",
	publisher: "",
	publishDate: "",
	price: 0,
	pages: 0,
	isbn: "",
	language: "",
	stock: 0,
	rating: 0,
	description: "",
};