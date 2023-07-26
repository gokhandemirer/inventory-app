import { expect } from 'vitest';
/**
 * Integration tests for the `inventory` router
 */
import { appRouter } from '@/server/api/root';
import { createInnerTRPCContext } from '@/server/api/trpc';
import { type RouterInputs } from '@/utils/api';
import { type Session } from 'next-auth';

const getCaller = (sessionObj?: Session | null) => {
	sessionObj ??= null;
	const ctx = createInnerTRPCContext({
		session: sessionObj,
	});

	return appRouter.createCaller(ctx);
};

describe('inventory router', () => {
	it('should get all inventory', async () => {
		// Arrange
		const caller = getCaller();

		// Act
		const all = await caller.inventory.getAll();

		// Assert
		expect(all.length).toBeGreaterThan(2);
	});

	it('should create and get inventory', async () => {
		// Arrange
		const caller = getCaller();

		const input: RouterInputs['inventory']['create'] = {
			name: 'integration test game',
			quantity: 150,
			categoryName: 'Games',
		};

		// Act
		const post = await caller.inventory.create(input);
		const byId = await caller.inventory.getById({
			id: post.id,
		});

		// Assert
		expect(byId).toMatchObject(input);
	});

	it('should return error when inventory already exists', async () => {
		// Arrange
		const caller = getCaller();

		const input: RouterInputs['inventory']['create'] = {
			name: 'integration test book',
			quantity: 150,
			categoryName: 'Books',
		};

		// Act
		await caller.inventory.create(input);

		// Assert
		await expect(caller.inventory.create(input)).rejects.toThrow(
			'"integration test book" inventory already exists'
		);
	});

	it('should create and delete inventory', async () => {
		// Arrange
		const caller = getCaller();

		const input: RouterInputs['inventory']['create'] = {
			name: 'integration test movie will be deleted',
			quantity: 150,
			categoryName: 'Movies',
		};

		// Act
		const post = await caller.inventory.create(input);
		await caller.inventory.delete({
			id: post.id,
		});
		const byId = await caller.inventory.getById({
			id: post.id,
		});

		// Assert
		expect(byId).toBeNull();
	});

	it('should create and update inventory', async () => {
		// Arrange
		const caller = getCaller();

		const input: RouterInputs['inventory']['create'] = {
			name: 'integration test movie will be updated',
			quantity: 150,
			categoryName: 'Movies',
		};

		const update: RouterInputs['inventory']['update'] = {
			id: '',
			name: 'integration test movie updated',
			quantity: 200,
			categoryName: 'Movies',
		};

		// Act
		const post = await caller.inventory.create(input);
		update.id = post.id;
		await caller.inventory.update(update);
		const byId = await caller.inventory.getById({
			id: post.id,
		});

		// Assert
		expect(byId).toMatchObject(update);
	});
});
