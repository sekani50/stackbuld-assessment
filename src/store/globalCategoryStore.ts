import { TCategory } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


// Define the categories state interface
interface categoryState {
  categories: TCategory[] | null;
  setCategories: (products: TCategory[] | null) => void;
}

// Create the categories store
const useCategoryStore = create<categoryState>()(
  persist(
    (set) => ({
      categories: null,
  setCategories: (categories: TCategory[] | null) => set({ categories }),
    }),
    {
      name: "categories", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // specify the storage mechanism
    }
  )
);

export default useCategoryStore;
