import { type CreateInventoryInput } from '@/server/api/schemas';

export const inventoryData: CreateInventoryInput[] = [
	{
		name: 'Test Game',
		quantity: 150,
		categoryName: 'Games',
	},
	{
		name: 'Test Movie',
		quantity: 15,
		categoryName: 'Movies',
	},
	{
		name: 'Test Book',
		quantity: 430,
		categoryName: 'Books',
	},
];