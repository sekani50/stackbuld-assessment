"use client"

import useCategoryStore from "@/store/globalCategoryStore";
import useProductStore from "@/store/globalProductStore";
import { SalesChart } from "../_components/charts/SalesChart";
import { CircularChart } from "../_components/charts/RoundChart";

function InventoryWidget({ title, metric }: { title: string; metric: number }) {
  return (
    <div className="bg-white rounded-lg flex flex-col items-start justify-start gap-y-3  py-9 sm:py-14 px-6 sm:px-8 shadow">
      <h2 className="font-semibold text-sm sm:text-base">{title}</h2>
      <p className="font-semibold gradient-text bg-basePrimary text-xl sm:text-3xl">
        {metric}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { categories } = useCategoryStore();
  const { products } = useProductStore();
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <InventoryWidget
          title="Total Categories"
          metric={categories?.length ?? 0}
        />
        <InventoryWidget
          title="Total Products"
          metric={products?.length ?? 0}
        />
        <InventoryWidget title="Total Sales" metric={0} />
      </div>
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-5">
        <SalesChart/>
    <CircularChart/>
      </div>
    </div>
  );
}
