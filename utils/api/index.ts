import { createClient } from "microcms-js-sdk";

export const origin = process.env.ORIGIN || "http://localhost:3000";

export const apiURLs = {
  about: `${origin}/api/about`,
  products: `${origin}/api/products`,
  blogContents: `${origin}/api/blogs`,
  blogContentDetail: (id: string) => `${origin}/api/blogs/${id}`,
};

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
export interface Contents<A> {
  contents: A[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface About {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  handleName: string;
  realName: string;
  mailAddress: string;
  links: Link[];
  histories: History[];
}

export interface Link {
  fieldId: string;
  name: string;
  link: string;
}

export interface History {
  fieldId: string;
  title: string;
  type: string[];
  public: boolean;
  startDate: string;
  detail?: string;
  endDate?: string;
}

export type Products = Contents<Product>;

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  releaseDate: string;
  link: string;
  detail: string;
}

export type BlogContents = Contents<BlogContent>;

export interface BlogContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  releaseDate: string;
}
