import useCategoryStore from "@/store/globalCategoryStore";
import useProductStore from "@/store/globalProductStore";
import { useEffect } from "react";
import { nanoid } from "nanoid";


export function useGetRequest() {
    const {setCategories, categories} = useCategoryStore()
    const {setProducts, products} = useProductStore()

    async function getCategories() {
      const response  = await fetch("/data/categories.json")
      const result  = await fetch("/data/products.json")
      const categoryData = await response.json()
      const productData = await result.json()

      const cats = categoryData.map((c: any) => {
        return {
          ...c,
          id: nanoid(),
        };
      });

      const prods = productData.map((p: any) => {
        return {
          ...p,

          category: cats.find(
            (c: any) => c.name.toLowerCase() === p.category.toLowerCase()
          ),
          id: nanoid(),
        };
      });
    




        if (categories !== null) return;
       setCategories(cats);
       if (products !== null) return;
       setProducts(prods);
       
    }

    useEffect(() => {
        getCategories();
    },[])
}