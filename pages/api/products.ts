import { client, Products } from "@/utils/api";

export default async (req, res) => {
  const resp = await client.get<Products>({
    endpoint: "products",
    queries: {},
  });

  res.statusCode = 200;
  res.json({
    ...resp,
  });
};
