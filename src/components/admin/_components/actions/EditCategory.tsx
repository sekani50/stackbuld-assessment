"use client"

import { Button, Portal } from "@/components/ui"
import { TCategory } from "@/types";
import { useState } from "react"
import { BiSolidEdit } from "react-icons/bi";
import { AddCategory } from "../../categories/AddCategory";

export function EditCategory({category}:{category: TCategory}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen((p) => !p);
    }
    return (
        <>
             <Button
        onClick={(e) => {
          e.stopPropagation();
          handleOpenModal();
        }}
        className="gap-x-2 text-white w-fit px-0 h-fit "
      >
        <BiSolidEdit size={16} />
        <p className="text-xs font-medium">Edit</p>
      </Button>

     <Portal>
     {isModalOpen && <AddCategory category={category} close={handleOpenModal}/>}
     </Portal>
        </>
    )
}