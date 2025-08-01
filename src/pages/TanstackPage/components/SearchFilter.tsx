import { useState } from "react";

interface SearchFilterProps {
	onSearch: (searchTerm: string) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
	const [inputValue, setInputValue] = useState("");

	const handleSearch = () => {
		onSearch(inputValue);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="mb-5 flex gap-2">
			<input
				type="text"
				placeholder="搜尋書籍標題..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				className="py-2 px-3 border border-gray-300 rounded min-w-[300px]"
			/>
			<button
				type="button"
				onClick={handleSearch}
				className="py-2 px-4 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
			>
				搜尋
			</button>
		</div>
	);
};

export default SearchFilter;
