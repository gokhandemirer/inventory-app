import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import {
	createInventorySchema,
	deleteInventorySchema,
	getProductByIdSchema,
} from '../schemas';

export const inventoryRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.inventory.findMany({
			orderBy: {
				updatedAt: 'desc',
			},
		});
	}),
	getById: publicProcedure
		.input(getProductByIdSchema)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.inventory.findUnique({
				where: {
					id: input.id,
				},
			});
		}),
	delete: publicProcedure
		.input(deleteInventorySchema)
		.mutation(async ({ ctx, input }) => {
			const { id } = input;

			try {
				const inventory = await ctx.prisma.inventory.delete({
					where: {
						id,
					},
				});

				return inventory;
			} catch (e) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong',
				});
			}
		}),
	update: publicProcedure
		.input(createInventorySchema)
		.mutation(async ({ ctx, input }) => {
			const { id, name, quantity, categoryName } = input;

			try {
				const inventory = await ctx.prisma.inventory.update({
					where: {
						id,
					},
					data: {
						name,
						categoryName,
						quantity,
					},
				});

				return inventory;
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					if (e.code === 'P2002') {
						throw new TRPCError({
							code: 'CONFLICT',
							message: `"${input.name}" inventory already exists`,
						});
					}
				}

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong',
				});
			}
		}),
	create: publicProcedure
		.input(createInventorySchema)
		.mutation(async ({ ctx, input }) => {
			const { name, quantity, categoryName } = input;

			try {
				const inventory = await ctx.prisma.inventory.create({
					data: {
						name,
						categoryName,
						quantity,
					},
				});

				return inventory;
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					if (e.code === 'P2002') {
						throw new TRPCError({
							code: 'CONFLICT',
							message: `"${input.name}" inventory already exists`,
						});
					}
				}

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong',
				});
			}
		}),
});
