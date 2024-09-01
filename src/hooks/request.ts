import useCategoryStore from "@/store/globalCategoryStore";
import { TCategory, TProduct } from "@/types";
import { useEffect } from "react";

type TResponse = {
    categories: TCategory[];
    products: TProduct[];
}
export function useGetRequest(data: TResponse) {
    const {setCategories, categories} = useCategoryStore()

    async function getCategories() {
        if (categories !== null) return;
       setCategories(data?.categories);
    }

    useEffect(() => {
        getCategories();
    },[])
}