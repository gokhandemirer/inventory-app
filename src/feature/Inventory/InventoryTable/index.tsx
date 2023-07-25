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
}

const InventoryTable = ({ data }: InventoryTableProps) => {
	return <Table data={data} columns={columns} />;
};

export default InventoryTable;