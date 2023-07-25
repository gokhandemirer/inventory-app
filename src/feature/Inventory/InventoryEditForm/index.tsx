import { useState, type FormEventHandler } from 'react';
import Form from '@/components/Form';
import InputWithLabel, { type Status } from '@/components/UI/InputWithLabel';
import Select from '@/components/UI/Select';

interface InventoryEditFormProps {
	categories: string[];
	status: Status;
}

const InventoryEditForm = ({ categories, status }: InventoryEditFormProps) => {
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

	return (
		<Form onSubmit={() => {}}>
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
				</div>
			</fieldset>
		</Form>
	);
};

export default InventoryEditForm;
