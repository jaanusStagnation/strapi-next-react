import { fetchAPI } from "@/utils/fetch-api";
import qs from "qs";
import createClient from "openapi-fetch";
import { operations, paths } from "./schema";

// Utility type to extract paths with a specific method
// type PathsWithMethod<TPaths, TMethod extends string> = {
//   [K in keyof TPaths]: TPaths[K] extends { [M in TMethod]: unknown }
//     ? K
//     : never;
// }[keyof TPaths];

const BASE_URL = process.env.STRAPI_URL;
const AUTH_TOKEN = process.env.STRAPI_API_KEY;

const client = createClient<paths>({ baseUrl: `${BASE_URL}/api` });

/**
 * Fetches the global settings from Strapi.
 * @returns {Promise<any>} The global settings data.
 * @throws {Error} If the fetch request fails.
 */
const globalSettingQuery = qs.stringify(
  {
    populate: {
      favIco: {
        fields: ["url", "alternativeText"],
      },
      logo: {
        fields: ["url", "alternativeText"],
      },
    },
  },
  { encodeValuesOnly: true }
);

export async function getGlobalSettings() {
  const path = "/api/global";
  const url = new URL(path, BASE_URL);
  url.search = globalSettingQuery;

  const response = await client.GET("/global", {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    querySerializer: () =>
      qs.stringify(
        {
          populate: {
            favIco: {
              fields: ["url", "alternativeText"],
            },
            logo: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        { encodeValuesOnly: true }
      ),
  });

  return response.data;
}

/**
 * Fetches the homepage data from Strapi.
 * @returns {Promise<any>} The homepage data.
 * @throws {Error} If the fetch request fails.
 */

export async function getHomePage() {
  const response = await client.GET("/home", {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    querySerializer: () =>
      qs.stringify(
        {
          populate: {
            background: {
              fields: ["url", "alternativeText"],
            },
            blocks: {
              on: {
                "shared.featured-categories": {
                  populate: {
                    categories: {
                      fields: ["id", "name"],
                      populate: {
                        image: {
                          fields: ["url", "alternativeText"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { encodeValuesOnly: true }
      ),
  });

  if (response.error) {
    console.error("Error fetching data:", {
      error: response.error.error.message,
    });
  }

  return response.data;
}

export async function getAboutPage() {
  const response = await client.GET("/about", {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    querySerializer: () =>
      qs.stringify(
        {
          populate: "*",
        },
        { encodeValuesOnly: true }
      ),
  });

  return response.data;
}

type ValueOf<T> = T[keyof T];

export type GetOperationUrl = ValueOf<{
  [K in keyof operations]: K extends `get${infer U}`
    ? U
    : never;
}>;

export async function getPage(url: GetOperationUrl) {
  const response = await client.GET(url, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    querySerializer: () =>
      qs.stringify(
        {
          populate: "*",
        },
        { encodeValuesOnly: true }
      ),
  });

  return {
    content: response.data,
    url: url,
  }
}

/**
 * Fetches the page data from Strapi by slug.
 * @returns {Promise<any>} The page data.
 * @throws {Error} If the fetch request fails.
 */

const pageBySlugQuery = (slug: string) =>
  qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: "*",
    },
    { encodeValuesOnly: true }
  );

export async function getPageBySlug(slug: string) {
  const endpoint = `${BASE_URL}/api/pages`;
  const url = new URL(endpoint, BASE_URL);
  url.search = pageBySlugQuery(slug);

  return await fetchAPI(url.href, { method: "GET", authToken: AUTH_TOKEN });
}
