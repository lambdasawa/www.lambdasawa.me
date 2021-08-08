import { BlogContent, BlogContents, client } from "@/utils/api";

export default async (req, res) => {
  const resp = await client.get<BlogContents>({
    endpoint: "blog-contents",
    queries: { orders: "-releaseDate", limit: 50 },
  });

  res.statusCode = 200;
  res.json({
    ...resp,
  });
};
