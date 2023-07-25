import { useState } from "react";
import Head from "next/head";
import { api } from "@/utils/api";
import InventoryForm from "@/feature/Inventory/InventoryForm";
import type { Status } from "@/components/UI/InputWithLabel";
import toast from 'react-hot-toast';
import InventoryTable from "@/feature/Inventory/InventoryTable";

export default function Home() {
  const utils = api.useContext();
  const [status, setStatus] = useState<Status>();
  const [categoryNames, setCategoryNames] = useState<string[]>([
    "Games",
    "Books",
    "Movies",
  ]);

  const successNotify = (message: string) => toast.success(message);
	const errorNotify = (error: string) => toast.error(error);

  const { data: inventories, refetch } = api.inventory.getAll.useQuery();

  const { mutateAsync: addInventory } = api.inventory.create.useMutation({
		onError(error) {
			setStatus('error');

			// If the error is a zod error, we will extract the field errors and display them
			if (error?.data?.zodError?.fieldErrors) {
				const { fieldErrors } = error.data.zodError;

				for (const field in fieldErrors) {
					fieldErrors[field]?.forEach((message) => {
						errorNotify(message);
					});
				}

				return;
			}

			// If the error is not a zod error, we will display the error message
			errorNotify(error.message);
		},

		async onSuccess({ name }) {
			successNotify(`${name} added to inventory`);
      refetch();
		},
	});

  const handleAddInventory = async (
    name: string,
    quantity: number,
    categoryName: string
  ) => {
    await addInventory({
			name,
			quantity,
			categoryName,
		});
  }
  
  return (
    <>
      <Head>
        <title>Inventory App</title>
      </Head>
      <div className="2xl:container 2xl:mx-auto">
        <InventoryForm
          onAddInventory={handleAddInventory}
          categories={categoryNames}
          status={status}
        />
        {inventories && <InventoryTable data={inventories} />}
      </div>
    </>
  );
}
