export async function getRequest<T>({ endpoint }: { endpoint: string }) {
  try {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXT_PUBLIC_BASE_URL || "https://stackbuld-assessment.vercel.app"
      : "https://stackbuld-assessment.vercel.app";

    const url = `${baseUrl}/api${endpoint}`;
    console.log('Fetching from URL:', url); // For debugging

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    return await response.json() ;
  } catch (error) {
    console.error('Error in getRequest:', error);
    throw error; // Re-throw to allow handling in the calling function
  }
}