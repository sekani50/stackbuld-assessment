import Landing from "@/components/landing/Landing";
import { getRequest } from "@/utils/server";
import { TResponse } from "@/types";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function fetchWithRetry(retries: number = 0): Promise<any> {
  try {
    const response = await getRequest<TResponse>({endpoint:"/request"});
    return response;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`Retry attempt ${retries + 1} of ${MAX_RETRIES}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(retries + 1);
    }
    throw error;
  }
}

export default async function Page() {
  try {
    const response = await fetchWithRetry();

    return (
      <div className="w-full h-full">
        <Landing data={response?.data as TResponse}/>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch data after multiple retries:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}