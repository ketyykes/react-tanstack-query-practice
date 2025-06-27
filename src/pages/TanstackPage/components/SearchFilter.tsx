interface SearchFilterProps {
	value: string;
	onChange: (value: string) => void;
}

const SearchFilter = ({ value, onChange }: SearchFilterProps) => {
	return (
		<div className="mb-5">
			<input
				type="text"
				placeholder="搜尋書籍標題..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="py-2 px-3 border border-gray-300 rounded min-w-[300px]"
			/>
		</div>
	);
};

export default SearchFilter;
