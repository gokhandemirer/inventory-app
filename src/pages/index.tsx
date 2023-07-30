import { useState } from 'react';
import Head from 'next/head';
import { api } from '@/utils/api';
import InventoryForm from '@/feature/Inventory/InventoryForm';
import type { Status } from '@/components/UI/InputWithLabel';
import toast from 'react-hot-toast';
import InventoryTable from '@/feature/Inventory/InventoryTable';
import InventoryEditModal from '@/feature/Inventory/InventoryEditModal';

export default function Home() {
	const [status, setStatus] = useState<Status>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [inventoryId, setInventoryId] = useState<string>('');
	const [categoryNames] = useState<string[]>(['Games', 'Books', 'Movies']);

	const successNotify = (message: string) => toast.success(message);
	const errorNotify = (error: string) => toast.error(error);

	const { data: inventories, refetch } = api.inventory.getAll.useQuery();

	const { mutateAsync: addInventory } = api.inventory.create.useMutation({
		onError(error) {
			setStatus('error');

			// If the error is a zod error, we will extract the field errors and display them
			if (error?.data?.zodError?.fieldErrors) {
				const { fieldErrors } = error.data.zodError;

				for (const field in fieldErrors) {
					fieldErrors[field]?.forEach((message) => {
						errorNotify(message);
					});
				}

				return;
			}

			// If the error is not a zod error, we will display the error message
			errorNotify(error.message);
		},

		async onSuccess({ name }) {
			successNotify(`${name} added to inventory`);
			await refetch();
		},
	});

	const handleAddInventory = async (
		name: string,
		quantity: number,
		categoryName: string
	) => {
		await addInventory({
			name,
			quantity,
			categoryName,
		});
	};

	const { mutateAsync: deleteInventory } = api.inventory.delete.useMutation({
		onError(error) {
			setStatus('error');
			errorNotify(error.message);
		},

		async onSuccess() {
			successNotify('Deleted inventory');
			await refetch();
		},
	});

	const handleDeleteInventory = async (id: string) => {
		await deleteInventory({ id });
	};

	const handleEditInventory = (id: string) => {
		setInventoryId(id);
		setShowModal(true);
	};

	const { mutateAsync: updateInventory } = api.inventory.update.useMutation({
		onError(error) {
			setStatus('error');
			errorNotify(error.message);
		},

		async onSuccess() {
			successNotify('Updated inventory');
			await refetch();
			handleToggleModal();
		},
	});

	const handleUpdateInventory = async (
		name: string,
		quantity: number,
		categoryName: string
	) => {
		await updateInventory({
			id: inventoryId,
			name,
			quantity,
			categoryName,
		});
	};

	const handleToggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<Head>
				<title>Inventory App</title>
			</Head>
			<div className='2xl:container 2xl:mx-auto'>
				<InventoryForm
					onAddInventory={handleAddInventory}
					categories={categoryNames}
					status={status}
				/>
				{inventories && (
					<InventoryTable
						data={inventories}
						onDeleteRow={handleDeleteInventory}
						onEditRow={handleEditInventory}
					/>
				)}
				<InventoryEditModal
					isOpen={showModal}
					inventoryId={inventoryId}
					handleToggleModal={handleToggleModal}
					onUpdateInventory={handleUpdateInventory}
					categories={categoryNames}
					status={status}
				/>
			</div>
		</>
	);
}
