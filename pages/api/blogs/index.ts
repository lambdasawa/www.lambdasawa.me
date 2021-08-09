import { BlogContents, client } from "@/utils/api";

async function handle(req, res) {
  const resp = await client.get<BlogContents>({
    endpoint: "blog-contents",
    queries: { orders: "-releaseDate", limit: 50 },
  });

  res.statusCode = 200;
  res.json({
    ...resp,
  });
}

export default handle;
