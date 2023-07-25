import { useState, type FormEventHandler } from 'react';
import Form from '@/components/Form';
import InputWithLabel, { type Status } from '@/components/UI/InputWithLabel';
import Select from '@/components/UI/Select';

interface InventoryFormProps {
	onAddInventory: (
		name: string,
		quantity: number,
		categoryName: string
	) => Promise<void>;
	categories: string[];
	status: Status;
}

const InventoryForm = ({
	categories,
	status,
	onAddInventory,
}: InventoryFormProps) => {
	const [categoryName, setCategoryName] = useState(categories?.[0] ?? '');
	const [inventoryName, setInventoryName] = useState('');
	const [inventoryQuantity, setInventoryQuantity] = useState(0);

	if (categoryName === '' && categories?.[0]) {
		setCategoryName(categories[0]);
	}

	const handleInventoryNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setInventoryName(e.target.value);
	};

	const handleCategoryNameChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCategoryName(e.target.value);
	};

	const handleInventoryQuantityChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setInventoryQuantity(Number(e.target.value));
	};

	const resetForm = () => {
		setInventoryName('');
		setInventoryQuantity(0);
		setCategoryName(categories?.[0] ?? '');
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		void onAddInventory(inventoryName, inventoryQuantity, categoryName);

		resetForm();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<fieldset className='border-2 border-gray-300 p-3 dark:border-gray-700 md:pb-4'>
				<legend className='text-lg font-semibold capitalize text-gray-700 dark:text-white'>
					Add Inventory
				</legend>
				<div className='mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
					<InputWithLabel
						id='inventoryname'
						name='inventoryname'
						type='text'
						label='Inventory Name'
						status={status}
						value={inventoryName}
						onChange={handleInventoryNameChange}
					/>
					<Select
						name='categories'
						id='categories'
						label='Category Name'
						defaultValue={categoryName}
						onChange={handleCategoryNameChange}
						options={categories}
					/>
					<InputWithLabel
						id='quantity'
						name='quantity'
						type='number'
						label='Quantity'
						status={status}
						value={inventoryQuantity}
						onChange={handleInventoryQuantityChange}
						min={0}
					/>
					<button
						type='submit'
						className='h-[2.625rem] self-end rounded-md bg-gray-700 px-6 py-2 leading-5 text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
					>
						Save
					</button>
				</div>
			</fieldset>
		</Form>
	);
};

export default InventoryForm;
