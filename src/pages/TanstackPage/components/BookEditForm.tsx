import type { ChangeEvent } from "react";
import type { Book } from "../../../api/types/api.types";

interface FormFieldProps {
	label: string;
	field: keyof Book;
	value: string | number | undefined;
	type?: "text" | "number" | "textarea";
	props?: Record<string, string | number>;
	onChange: (field: keyof Book, value: string | number) => void;
}

const FormField = ({
	label,
	field,
	value,
	type = "text",
	props,
	onChange,
}: FormFieldProps) => {
	const stringValue = value !== undefined ? String(value) : "";

	const commonInputProps = {
		value: stringValue,
		onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const newValue =
				type === "number" ? Number(e.target.value) : e.target.value;
			onChange(field, newValue);
		},
		className: "w-full p-2 border border-gray-300 rounded",
		...props,
	};

	return (
		<div>
			<label className="block text-sm font-medium mb-1">{label}：</label>
			{type === "textarea" ? (
				<textarea
					{...commonInputProps}
					className="w-full p-2 border border-gray-300 rounded h-20"
				/>
			) : (
				<input type={type} {...commonInputProps} />
			)}
		</div>
	);
};

interface FieldGridProps {
	leftField: React.ReactElement;
	rightField: React.ReactElement;
}

const FieldGrid = ({ leftField, rightField }: FieldGridProps) => (
	<div className="grid grid-cols-2 gap-2">
		<div>{leftField}</div>
		<div>{rightField}</div>
	</div>
);

interface ActionButtonsProps {
	isUpdatePending: boolean;
	onUpdate: () => void;
	onCancel: () => void;
}

const ActionButtons = ({
	isUpdatePending,
	onUpdate,
	onCancel,
}: ActionButtonsProps) => (
	<div className="mt-4 flex gap-2">
		<button
			type="button"
			onClick={onUpdate}
			disabled={isUpdatePending}
			className="py-2 px-4 bg-green-600 text-white border-none rounded cursor-pointer disabled:opacity-50"
		>
			{isUpdatePending ? "更新中..." : "儲存變更"}
		</button>
		<button
			type="button"
			onClick={onCancel}
			disabled={isUpdatePending}
			className="py-2 px-4 bg-gray-600 text-white border-none rounded cursor-pointer disabled:opacity-50"
		>
			取消
		</button>
	</div>
);

interface BookEditFormProps {
	editForm: Partial<Book>;
	isUpdatePending: boolean;
	onFormChange: (field: keyof Book, value: string | number) => void;
	onUpdate: () => void;
	onCancel: () => void;
}

const BookEditForm = ({
	editForm,
	isUpdatePending,
	onFormChange,
	onUpdate,
	onCancel,
}: BookEditFormProps) => {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-3">編輯書籍</h2>
			<div className="border border-gray-300 rounded p-4">
				<div className="space-y-3">
					<FormField
						label="標題"
						field="title"
						value={editForm.title}
						onChange={onFormChange}
					/>
					<FormField
						label="作者"
						field="author"
						value={editForm.author}
						onChange={onFormChange}
					/>
					<FormField
						label="出版社"
						field="publisher"
						value={editForm.publisher}
						onChange={onFormChange}
					/>
					<FormField
						label="出版日期"
						field="publishDate"
						value={editForm.publishDate}
						onChange={onFormChange}
					/>
					<FieldGrid
						leftField={
							<FormField
								label="價格"
								field="price"
								value={editForm.price}
								type="number"
								onChange={onFormChange}
							/>
						}
						rightField={
							<FormField
								label="頁數"
								field="pages"
								value={editForm.pages}
								type="number"
								onChange={onFormChange}
							/>
						}
					/>
					<FormField
						label="ISBN"
						field="isbn"
						value={editForm.isbn}
						onChange={onFormChange}
					/>
					<FieldGrid
						leftField={
							<FormField
								label="語言"
								field="language"
								value={editForm.language}
								onChange={onFormChange}
							/>
						}
						rightField={
							<FormField
								label="庫存"
								field="stock"
								value={editForm.stock}
								type="number"
								onChange={onFormChange}
							/>
						}
					/>
					<FormField
						label="評分"
						field="rating"
						value={editForm.rating}
						type="number"
						props={{
							step: "0.1",
							min: "0",
							max: "5",
						}}
						onChange={onFormChange}
					/>
					<FormField
						label="描述"
						field="description"
						value={editForm.description}
						type="textarea"
						onChange={onFormChange}
					/>
				</div>
				<ActionButtons
					isUpdatePending={isUpdatePending}
					onUpdate={onUpdate}
					onCancel={onCancel}
				/>
			</div>
		</div>
	);
};

export default BookEditForm;
