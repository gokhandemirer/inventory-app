import { api } from '@/utils/api';
import Modal from '@/components/UI/Modal';
import InventoryEditForm from '../InventoryEditForm';
import { Status } from '@/components/UI/InputWithLabel';

type Props = {
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
};

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
		void onUpdateInventory(name, quantity, categoryName);
	};

	return (
		<Modal
			isOpen={isOpen}
			toggleModal={handleToggleModal}
			title='Edit Inventory'
			children={
				<InventoryEditForm
					categories={categories}
					status={status}
					inventory={inventory}
					onUpdateInventory={handleUpdateInventory}
				/>
			}
		/>
	);
};

export default InventoryEditModal;
