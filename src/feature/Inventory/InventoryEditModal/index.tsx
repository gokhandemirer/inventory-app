import { api } from '@/utils/api';
import Modal from '@/components/UI/Modal';
import React, { useEffect } from 'react';
import InventoryEditForm from '../InventoryEditForm';
import { Status } from '@/components/UI/InputWithLabel';

type Props = {
	inventoryId?: string;
	isOpen: boolean;
	categories: string[];
	status: Status;
	handleToggleModal: () => void;
};

const InventoryEditModal = (props: Props) => {
	const { inventoryId, isOpen, categories, status, handleToggleModal } =
		props;

	useEffect(() => {
		if (inventoryId) {
		}
	}, [inventoryId]);

	return (
		<Modal
			isOpen={isOpen}
			toggleModal={handleToggleModal}
			title='Edit Inventory'
			children={
				<InventoryEditForm categories={categories} status={status} />
			}
			firstButtonAction={() => {
				alert(123);
			}}
		/>
	);
};

export default InventoryEditModal;
