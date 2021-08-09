import { client, Products } from "@/utils/api";

async function handle(req, res) {
  const resp = await client.get<Products>({
    endpoint: "products",
    queries: {},
  });

  res.statusCode = 200;
  res.json({
    ...resp,
  });
}

export default handle;
