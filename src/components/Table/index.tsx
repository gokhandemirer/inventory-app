import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';

interface TableProps<T extends object> {
	data: T[];
	columns: ColumnDef<T>[];
	onDeleteRow: (
		id: string,
	) => Promise<void>;
	onEditRow: (
		id: string,
	) => Promise<void>;
}

const Table = <T extends object>({ data, columns, onDeleteRow, onEditRow }: TableProps<T>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const pageIndex = table.getState().pagination.pageIndex;
	const pageSize = table.getState().pagination.pageSize;

	const pageRangeStart = pageIndex * pageSize + 1;
	const pageRangeEnd =
		(pageIndex + 1) * pageSize < data.length
			? (pageIndex + 1) * pageSize
			: data.length;

	const pageRange = `${pageRangeStart}-${pageRangeEnd}`;

	const handleDeleteRow = (id: string) => {
		if (onDeleteRow) {
			void onDeleteRow(id);
		}
	}

	const handleEditRow = (id: string) => {
		if (onEditRow) {
			void onEditRow(id);
		}
	}

	return (
		<>
			<div className='mb-4 overflow-x-auto p-2 py-4'>
				<div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
					<table className='min-w-full leading-normal'>
						<thead className='bg-gray-50 text-xs uppercase text-gray-700'>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											scope='col'
											className='border-b border-gray-200  px-5 py-3 text-left  text-sm text-gray-800'
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
												  )}
										</th>
									))}
										<th
											scope='col'
											className='border-b border-gray-200  px-5 py-3 text-left text-sm text-gray-800 text-center'
										>
											Action
										</th>
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr
									key={row.id}
									className='odd:bg-white even:bg-gray-50'
								>
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											className='border-b border-gray-200  p-5 text-sm'
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
										<td className='border-b border-gray-200 p-5 text-sm flex flex-col items-center gap-2'>
											<button 
												className="bg-red-500 text-white py-2 px-4 rounded"
												onClick={() => { handleDeleteRow(row.original.id) }}
											>
												Delete
											</button>
											<button 
												className="bg-gray-500 text-white py-2 px-4 rounded"
												onClick={() => { handleEditRow(row.original.id) }}
											>
												Edit
											</button>
										</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className='flex flex-col items-center gap-2 pl-4 pt-2 md:flex-row'>
						<div className='flex items-center gap-2 pl-4 pt-2'>
							<button
								className='border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}
							>
								{'<<'}
							</button>
							<button
								className='ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								<span className='sr-only'>Previous</span>
								<svg
									className='h-5 w-5'
									aria-hidden='true'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
										clipRule='evenodd'
									/>
								</svg>
							</button>
							<button
								className='block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								<span className='sr-only'>Next</span>
								<svg
									className='h-5 w-5'
									aria-hidden='true'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
										clipRule='evenodd'
									/>
								</svg>
							</button>

							<button
								className='border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								onClick={() =>
									table.setPageIndex(table.getPageCount() - 1)
								}
								disabled={!table.getCanNextPage()}
							>
								{'>>'}
							</button>
						</div>

						<div className='flex flex-col items-center gap-2 pl-4 pt-2 sm:flex-row'>
							<div className='flex flex-row'>
								<span className='flex items-center gap-1'>
									<div>Page</div>
									<strong>
										{table.getState().pagination.pageIndex +
											1}{' '}
										of {table.getPageCount()}
									</strong>
								</span>
								<span className='flex items-center gap-1'>
									| Go to page:
									<input
										type='number'
										min={1}
										max={table.getPageCount()}
										defaultValue={
											table.getState().pagination
												.pageIndex + 1
										}
										onChange={(e) => {
											const page = e.target.value
												? Number(e.target.value) - 1
												: 0;
											table.setPageIndex(page);
										}}
										className='w-16 rounded border p-1'
									/>
								</span>
							</div>
							<select
								value={table.getState().pagination.pageSize}
								onChange={(e) => {
									table.setPageSize(Number(e.target.value));
								}}
							>
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
					<p className='flex items-center justify-between pl-4 pt-2'>
						<span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
							Showing{' '}
							<span className='font-semibold text-gray-900 dark:text-white'>
								{pageRange}
							</span>{' '}
							of{' '}
							<span className='font-semibold text-gray-900 dark:text-white'>
								{data.length}
							</span>
						</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default Table;