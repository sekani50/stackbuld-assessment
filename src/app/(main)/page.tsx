"use server"

import Landing from "@/components/landing/Landing";
import { getRequest } from "@/utils/server";
import { TResponse } from "@/types";

export default async function Page() {
    const response =  await getRequest<TResponse>({endpoint:"/request"})
console.log(response)
  return (
    <div className=" w-full h-full">
      <Landing data={response?.data}/>
    </div>
  )
}
