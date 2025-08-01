import { useForm, Controller, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { Book } from "../../../api/types/api.types";
import { 
	bookEditSchema, 
	type BookEditFormData, 
	bookEditDefaultValues 
} from "../../../schemas/bookSchema";

interface FormFieldProps {
	label: string;
	name: keyof BookEditFormData;
	control: Control<BookEditFormData>;
	type?: "text" | "number" | "textarea";
	props?: Record<string, string | number>;
	error?: string;
}

const FormField = ({
	label,
	name,
	control,
	type = "text",
	props,
	error,
}: FormFieldProps) => {
	return (
		<div>
			<label className="block text-sm font-medium mb-1">{label}：</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					const commonProps = {
						...field,
						className: `w-full p-2 border rounded ${
							error ? "border-red-500" : "border-gray-300"
						}`,
						...props,
					};

					if (type === "textarea") {
						return (
							<textarea
								{...commonProps}
								className={`${commonProps.className} h-20`}
							/>
						);
					}

					if (type === "number") {
						return (
							<input
								{...commonProps}
								type="number"
								onChange={(e) => {
									const value = e.target.value === "" ? 0 : Number(e.target.value);
									field.onChange(value);
								}}
							/>
						);
					}

					return <input {...commonProps} type={type} />;
				}}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
	onCancel: () => void;
	isValid: boolean;
}

const ActionButtons = ({
	isUpdatePending,
	onCancel,
	isValid,
}: ActionButtonsProps) => (
	<div className="mt-4 flex gap-2">
		<button
			type="submit"
			disabled={isUpdatePending || !isValid}
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
	initialData: Partial<Book>;
	isUpdatePending: boolean;
	onSubmit: (data: BookEditFormData) => void;
	onCancel: () => void;
}

const BookEditForm = ({
	initialData,
	isUpdatePending,
	onSubmit,
	onCancel,
}: BookEditFormProps) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<BookEditFormData>({
		resolver: zodResolver(bookEditSchema),
		defaultValues: bookEditDefaultValues,
		mode: "onChange", // 即時驗證
	});

	// 當 initialData 變更時重置表單
	useEffect(() => {
		if (initialData) {
			reset({
				title: initialData.title || "",
				author: initialData.author || "",
				publisher: initialData.publisher || "",
				publishDate: initialData.publishDate || "",
				price: initialData.price || 0,
				pages: initialData.pages || 0,
				isbn: initialData.isbn || "",
				language: initialData.language || "",
				stock: initialData.stock || 0,
				rating: initialData.rating || 0,
				description: initialData.description || "",
			});
		}
	}, [initialData, reset]);

	const handleFormSubmit = (data: BookEditFormData) => {
		onSubmit(data);
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-3">編輯書籍</h2>
			<div className="border border-gray-300 rounded p-4">
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<div className="space-y-3">
						<FormField
							label="標題"
							name="title"
							control={control}
							error={errors.title?.message}
						/>
						<FormField
							label="作者"
							name="author"
							control={control}
							error={errors.author?.message}
						/>
						<FormField
							label="出版社"
							name="publisher"
							control={control}
							error={errors.publisher?.message}
						/>
						<FormField
							label="出版日期"
							name="publishDate"
							control={control}
							type="text"
							props={{ placeholder: "YYYY-MM-DD" }}
							error={errors.publishDate?.message}
						/>
						<FieldGrid
							leftField={
								<FormField
									label="價格"
									name="price"
									control={control}
									type="number"
									error={errors.price?.message}
								/>
							}
							rightField={
								<FormField
									label="頁數"
									name="pages"
									control={control}
									type="number"
									error={errors.pages?.message}
								/>
							}
						/>
						<FormField
							label="ISBN"
							name="isbn"
							control={control}
							error={errors.isbn?.message}
						/>
						<FieldGrid
							leftField={
								<FormField
									label="語言"
									name="language"
									control={control}
									error={errors.language?.message}
								/>
							}
							rightField={
								<FormField
									label="庫存"
									name="stock"
									control={control}
									type="number"
									error={errors.stock?.message}
								/>
							}
						/>
						<FormField
							label="評分"
							name="rating"
							control={control}
							type="number"
							props={{
								step: "0.1",
								min: "0",
								max: "5",
							}}
							error={errors.rating?.message}
						/>
						<FormField
							label="描述"
							name="description"
							control={control}
							type="textarea"
							error={errors.description?.message}
						/>
					</div>
					<ActionButtons
						isUpdatePending={isUpdatePending}
						onCancel={onCancel}
						isValid={isValid}
					/>
				</form>
			</div>
		</div>
	);
};

export default BookEditForm;
