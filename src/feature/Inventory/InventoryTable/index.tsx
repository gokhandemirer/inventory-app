import Table from '@/components/Table';
import { type Inventory } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Inventory>[] = [
	{
		accessorKey: 'name',
		header: () => 'Name',
	},
	{
		accessorKey: 'categoryName',
		header: () => 'Category',
	},
	{
		accessorKey: 'quantity',
		header: () => 'Quantity',
	},
];

interface InventoryTableProps {
	data: Inventory[];
	onDeleteRow: (id: string) => Promise<void>;
	onEditRow: (id: string) => Promise<void>;
}

const InventoryTable = ({
	data,
	onDeleteRow,
	onEditRow,
}: InventoryTableProps) => {
	return (
		<Table
			data={data}
			columns={columns}
			onDeleteRow={onDeleteRow}
			onEditRow={onEditRow}
		/>
	);
};

export default InventoryTable;
