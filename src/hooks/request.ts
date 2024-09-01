import useCategoryStore from "@/store/globalCategoryStore";
import useProductStore from "@/store/globalProductStore";
import { TCategory, TProduct } from "@/types";
import { useEffect } from "react";

type TResponse = {
    categories: TCategory[];
    products: TProduct[];
}
export function useGetRequest(data: TResponse) {
    const {setCategories, categories} = useCategoryStore()
    const {setProducts, products} = useProductStore()

    async function getCategories() {
        if (categories !== null) return;
       setCategories(data?.categories);
       if (products !== null) return;
       setProducts(data?.products);
       
    }

    useEffect(() => {
        getCategories();
    },[])
}