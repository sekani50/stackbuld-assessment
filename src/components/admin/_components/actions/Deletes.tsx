"use client";

import { Button, Portal } from "@/components/ui";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useState } from "react";
export function Deletes({ deleteFunction }: { deleteFunction: () => void }) {
  const [showDelete, setShowDelete] = useState(false);

  function handleDelete() {
    setShowDelete((p) => !p);
  }

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="gap-x-2 text-white w-fit px-0 h-fit "
      >
        <RiDeleteBin4Line size={16} />
        <p className="text-xs font-medium">Delete</p>
      </Button>

     
        <Portal>
       {showDelete && <div className="w-full fixed inset-0 h-full bg-black/20 z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[95%] sm:max-w-md bg-white grid grid-cols-1 items-center gap-y-20 rounded-lg py-6 px-4 h-fit m-auto absolute inset-0"
          >
            <p>Are you sure you want to continue?</p>

            <div className="w-full flex items-end justify-end gap-x-2">
              <Button
                onClick={handleDelete}
                className="bg-gray-200 font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={deleteFunction}
                className="bg-baseSecondary text-white font-medium"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>}
        </Portal>
      
    </>
  );
}
