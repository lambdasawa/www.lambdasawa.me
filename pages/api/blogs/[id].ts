import { BlogContent, client } from "@/utils/api";

async function handle(req, res) {
  const resp = await client.get<BlogContent>({
    endpoint: "blog-contents",
    contentId: req.query.id,
    queries: {},
  });

  res.statusCode = 200;
  res.json({
    ...resp,
  });
}

export default handle;
