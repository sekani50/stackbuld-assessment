"use client";
import { useScrollCard } from "@/hooks";
import React, { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export function ScrollableCards({ children }: { children: React.ReactNode }) {
	const scroll = useRef<HTMLDivElement>(null);
	const { next, previous, isPrevious, isNext } = useScrollCard(scroll);
	return (
		<div className="w-full overflow-x-hidden relative">
			<button
				className={
					isPrevious
						? "absolute z-[20] w-fit h-fit cursor-pointer p-1 rounded-full hidden sm:block left-[15px] text-black top-[35%] z-1 bg-white transition-all duration-700 ease-in select-none "
						: "hidden"
				}
				onClick={previous}
			>
				<MdNavigateBefore className="text-[22px]" />
			</button>
			<div
				className={
					isNext
						? "absolute w-fit z-[20] h-fit cursor-pointer p-1 hidden sm:block right-[7px] text-black top-[35%] z-1 bg-white transition-all duration-700 ease-in select-none rounded-full "
						: "hidden"
				}
				onClick={next}
			>
				<MdNavigateNext className="text-[22px]" />
			</div>
			<div
				ref={scroll}
				className="hide-scroll w-[105%] flex gap-4 pr-[4em] pl-[0em] sm:pl-[1em] overflow-x-auto"
			>
				<div className="min-w-max flex gap-2 sm:gap-4 ">{children}</div>
			</div>
		</div>
	);
}
