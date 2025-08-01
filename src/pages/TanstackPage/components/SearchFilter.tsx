import { useState } from "react";

interface SearchFilterProps {
	onSearch: (searchTerm: string) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(inputValue);
	};

	return (
		<form onSubmit={handleSubmit} className="mb-5 flex gap-2">
			<input
				type="text"
				placeholder="搜尋書籍標題..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="py-2 px-3 border border-gray-300 rounded min-w-[300px]"
			/>
			<button
				type="submit"
				className="py-2 px-4 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
			>
				搜尋
			</button>
		</form>
	);
};

export default SearchFilter;
