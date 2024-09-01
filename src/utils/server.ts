
export async function getRequest<T>({ endpoint }: { endpoint: string }) {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? "http://localhost:4009"
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
  