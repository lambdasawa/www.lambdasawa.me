import { createClient } from "microcms-js-sdk";
import { About, BlogContent, BlogContents, Products } from "./types";

export const origin = process.env.ORIGIN || "http://localhost:3000";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export function findBlogContent(id: string): Promise<BlogContent> {
  return client.get<BlogContent>({
    endpoint: "blog-contents",
    contentId: id,
    queries: {},
  });
}

export function findBlogContents(): Promise<BlogContents> {
  return client.get<BlogContents>({
    endpoint: "blog-contents",
    queries: { orders: "-releaseDate", limit: 50 },
  });
}

export async function findAbout(): Promise<About> {
  const resp = await client.get<About>({
    endpoint: "about",
    queries: {},
  });

  return {
    ...resp,
    histories: resp.histories
      .filter((h) => h.public)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
  };
}

export function findProducts(): Promise<Products> {
  return client.get<Products>({
    endpoint: "products",
    queries: {},
  });
}