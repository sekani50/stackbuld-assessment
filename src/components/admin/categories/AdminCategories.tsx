"use  client"

import { Button } from "@/components/ui/Button";
import useCategoryStore from "@/store/globalCategoryStore";
import { useState } from "react";
import { RiApps2AddLine } from "react-icons/ri";
export default function AdminCategories() {
    const {categories} = useCategoryStore(); // Get categories from global store
    const [isOpen, setOpen] = useState(false); // Add category modal state

    function handleOpenModal() {
        setOpen((p) => !p) // Toggle modal state
    }
    return (
        <div className="w-full">
           {/* Handle Empty Category */}
           {(Array.isArray(categories) && categories.length > 0) || categories !== null  && <div className="w-full flex items-center justify-between mb-6 sm:mb-12">
                <h1 className="text-base sm:text-2xl font-semibold">Admin Categories</h1>
                <Button 
                onClick={handleOpenModal}
                className="w-fit bg-basePrimary text-white font-medium h-11 gap-x-2">
                    <RiApps2AddLine size={20}/>
                    <p>Add Category</p>
                </Button>

            </div>}
            {/* Handle Empty Category */}
            {(Array.isArray(categories) && categories.length === 0) || categories === null  && <div className="w-full flex flex-col gap-y-3 items-center justify-center h-[40rem]">
                <h2 className="font-semibold text-base sm:text-xl bg-basePrimary gradient-text">No Categries Yet</h2>
                <Button
                onClick={handleOpenModal}
                className="w-fit bg-basePrimary text-white font-medium h-11 sm:h-12 gap-x-2">
                    <RiApps2AddLine size={20}/>
                    <p>Add Category</p>
                </Button>
            </div>}

{/* Render Categories */}

        </div>
    )
}