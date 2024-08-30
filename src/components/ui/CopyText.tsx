"use client"

import { BsCopy } from "react-icons/bs";
import { Button } from "./Button";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { IoTriangle } from "react-icons/io5";

export function CopyText({ value }: { value: string }) {
  const [isShow, setShow] = useState(false);

  function copied() {
    copy(value);
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 3000);
  }

  return (
    <div className="flex items-center gap-x-2">
      <p>{value}</p>

      <Button onClick={copied} className="h-fit relative w-fit px-0">
        <BsCopy className="text-xl text-cakkie" />

        {isShow && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute shadow-lg border top-[-4rem] flex items-center justify-center w-fit px-4 py-2 px- -right-6 bg-cakkie"
          >
            <p className="text-gray-50">Copied</p>

            <div className="absolute right-[38%] bottom-[-16px]">
              <IoTriangle className="rotate-180 text-cakkie  text-[22px]" />
            </div>
          </div>
        )}
      </Button>
    </div>
  );
}
