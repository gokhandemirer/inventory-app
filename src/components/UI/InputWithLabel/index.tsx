import Input, { type InputProps } from '../Input';

export type Status = InputWithLabelProps['status'];
interface InputWithLabelProps extends InputProps {
	id: string;
	status?: 'success' | 'error';
	label: string;
	successMessage?: string;
	errorMessage?: string;
}

const InputWithLabel = ({ label, status, ...props }: InputWithLabelProps) => {
	const { id } = props;

	if (status === 'success') {
		return (
			<div>
				<label
					htmlFor={id}
					className='mb-2 block text-sm font-medium text-green-700 dark:text-green-500'
				>
					{label}
				</label>
				<Input
					{...props}
					className='block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder:text-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder:text-green-500'
				/>
				{/* <p className='mt-2 text-sm text-green-600 dark:text-green-500'>
					{successMessage}
				</p> */}
			</div>
		);
	}

	if (status === 'error') {
		return (
			<div>
				<label
					htmlFor={id}
					className='mb-2 block text-sm font-medium text-red-700 dark:text-red-500'
				>
					{label}
				</label>
				<Input
					{...props}
					className='block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder:text-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder:text-red-500'
				/>
				{/* <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>
					{errorMessage}
				</p> */}
			</div>
		);
	}

	return (
		<div>
			<label
				htmlFor={id}
				className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-500'
			>
				{label}
			</label>

			<Input
				{...props}
				className='block w-full rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-700 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-500'
			/>
		</div>
	);
};

export default InputWithLabel;