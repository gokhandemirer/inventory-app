import React, { type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	options?: string[];
}

const Select = ({ className, label, options, ...props }: SelectProps) => {
	return (
		<div>
			{label && (
				<label
					htmlFor={props.id}
					className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'
				>
					{label}
				</label>
			)}
			<select
				{...props}
				className={`${
					className ?? ''
				} block w-full appearance-none rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
			>
				{options?.map((value) => (
					<option value={value} key={value}>
						{value}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;