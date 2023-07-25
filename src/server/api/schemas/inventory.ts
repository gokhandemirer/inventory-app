import { getMaxLengthErrorMessage, getMinLengthErrorMessage } from '@/utils';
import { startsWithLetterRegex, startsWithLetterRegexErrorMessage, Inventory } from 'src/contants';

import z from 'zod';

export const createInventorySchema = z.object({
	id: z.string().cuid().optional(),
	name: z
		.string()
		.regex(startsWithLetterRegex, startsWithLetterRegexErrorMessage)
		.trim()
		.min(0, getMinLengthErrorMessage(0, 'Name'))
		.min(
			Inventory.MinNameLength,
			getMinLengthErrorMessage(Inventory.MinNameLength, 'Name'),
		)
		.max(
			Inventory.MaxNameLength,
			getMaxLengthErrorMessage(Inventory.MaxNameLength, 'Name'),
		),
	quantity: z.number().min(Inventory.MinQuantity).max(Inventory.MaxQuantity),
	categoryName: z
		.string()
		.regex(startsWithLetterRegex, startsWithLetterRegexErrorMessage)
		.trim()
		.min(0, getMinLengthErrorMessage(0, 'Category name'))
		.min(
			Inventory.MinNameLength,
			getMinLengthErrorMessage(Inventory.MinNameLength, 'Category name'),
		)
		.max(
			Inventory.MaxNameLength,
			getMaxLengthErrorMessage(Inventory.MaxNameLength, 'Category name'),
		),
});

export const deleteInventorySchema = z.object({
	id: z.string(),
});

export type CreateInventoryInput = z.TypeOf<typeof createInventorySchema>;