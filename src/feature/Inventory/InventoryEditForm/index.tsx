import { useState, type FormEventHandler, useEffect } from 'react';
import Form from '@/components/Form';
import InputWithLabel, { type Status } from '@/components/UI/InputWithLabel';
import Select from '@/components/UI/Select';

interface InventoryEditFormProps {
	categories: string[];
	status: Status;
	inventory?: {
		name: string;
		quantity: number;
		categoryName: string;
	};
	onUpdateInventory: (
		name: string,
		quantity: number,
		categoryName: string
	) => Promise<void>;
}

const InventoryEditForm = ({
	categories,
	status,
	inventory,
	onUpdateInventory,
}: InventoryEditFormProps) => {
	const [categoryName, setCategoryName] = useState(
		inventory ? inventory.categoryName : categories?.[0] ?? ''
	);
	const [inventoryName, setInventoryName] = useState('');
	const [inventoryQuantity, setInventoryQuantity] = useState(0);

	useEffect(() => {
		if (inventory) {
			setInventoryName(inventory.name);
			setInventoryQuantity(inventory.quantity);
			setCategoryName(inventory.categoryName);
		}
	}, [inventory]);

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

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		void onUpdateInventory(inventoryName, inventoryQuantity, categoryName);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<fieldset className='border-2 border-gray-300 p-3 dark:border-gray-700 md:pb-4'>
				<legend className='text-lg font-semibold capitalize text-gray-700 dark:text-white'>
					Edit Inventory
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
						className='h-[2.625rem] self-end rounded-md bg-green-700 px-6 py-2 leading-5 text-white transition-colors duration-200 hover:bg-green-600 focus:bg-green-600 focus:outline-none'
					>
						Update
					</button>
				</div>
			</fieldset>
		</Form>
	);
};

export default InventoryEditForm;
