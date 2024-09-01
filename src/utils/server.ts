
export async function getRequest<T>({ endpoint }: { endpoint: string }) {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXT_PUBLIC_BASE_URL 
      : "";

    const url = `${baseUrl}/api${endpoint}`; 
    
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
 
    return response.json();
  }
  