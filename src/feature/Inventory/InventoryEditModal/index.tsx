import { api } from '@/utils/api';
import Modal from '@/components/UI/Modal';
import InventoryEditForm from '../InventoryEditForm';
import { type Status } from '@/components/UI/InputWithLabel';

interface Props {
	inventoryId: string;
	isOpen: boolean;
	categories: string[];
	status: Status;
	handleToggleModal: () => void;
	onUpdateInventory: (
		name: string,
		quantity: number,
		categoryName: string
	) => Promise<void>;
}

const InventoryEditModal = (props: Props) => {
	const {
		inventoryId,
		isOpen,
		categories,
		status,
		handleToggleModal,
		onUpdateInventory,
	} = props;

	const { data } = api.inventory.getById.useQuery(
		{
			id: inventoryId,
		},
		{
			enabled: isOpen,
		}
	);

	const inventory = {
		name: data?.name ?? '',
		quantity: data?.quantity ?? 0,
		categoryName: data?.categoryName ?? '',
	};

	const handleUpdateInventory = async (
		name: string,
		quantity: number,
		categoryName: string
	) => {
		void (await onUpdateInventory(name, quantity, categoryName));
	};

	return (
		<Modal
			isOpen={isOpen}
			toggleModal={handleToggleModal}
			title='Edit Inventory'
		>
			<InventoryEditForm
				categories={categories}
				status={status}
				inventory={inventory}
				onUpdateInventory={handleUpdateInventory}
			/>
		</Modal>
	);
};

export default InventoryEditModal;
