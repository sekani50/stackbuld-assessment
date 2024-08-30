import { TProduct } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


// Define the product state interface
interface productState {
  products: TProduct[] | null;
  setProducts: (products: TProduct[] | null) => void;
}

// Create the  product store
const useProductStore = create<productState>()(
  persist(
    (set) => ({
      products: null,
  setProducts: (products: TProduct[] | null) => set({ products }),
    }),
    {
      name: "products", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // specify the storage mechanism
    }
  )
);

export default useProductStore;
