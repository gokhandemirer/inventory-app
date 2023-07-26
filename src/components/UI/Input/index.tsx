import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ type, className, ...props }: InputProps) => {
	return (
		<input
			{...props}
			className={`${
				className ?? ''
			} block w-full rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-700 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-500`}
			type={type ?? 'text'}
		/>
	);
};

export default Input;