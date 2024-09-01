
import Landing from "@/components/landing/Landing";
import { getRequest } from "@/utils/server";
import { TResponse } from "@/types";

export default  function Page() {
//   const response =  await getRequest<TResponse>({endpoint:"/request"})

const response: any = {}
  return (
    <div className=" w-full h-full">
      <Landing data={response}/>
    </div>
  )
}
