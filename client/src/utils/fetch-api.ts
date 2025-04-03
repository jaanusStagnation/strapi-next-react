
interface FetchAPIOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    authToken?: string;
    body?: Record<string, unknown>;
    next?: NextFetchRequestConfig;
  }
  

export async function fetchAPI(url: string, options: FetchAPIOptions) {
    const { method, authToken, body, next } = options;

  const res = await fetch(url, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  });

  if (!res.ok) {
    console.error("Error fetching data:", {res});
    throw new Error(`Failed to fetch data from Strapi: ${res.statusText}`);
  }

  return res.json();

}