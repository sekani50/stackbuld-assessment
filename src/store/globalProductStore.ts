import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


// Define the user state interface
interface productState {
  products: any[] | null;
  setProducts: (products: any[] | null) => void;
}

// Create the user store
const useUserStore = create<productState>()(
  persist(
    (set) => ({
      products: null,
  setProducts: (products: any[] | null) => set({ products }),
    }),
    {
      name: "products", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // specify the storage mechanism
    }
  )
);

export default useUserStore;
