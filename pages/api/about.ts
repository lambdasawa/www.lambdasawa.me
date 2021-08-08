import { About, client } from "@/utils/api";

export default async (req, res) => {
  const resp = await client.get<About>({
    endpoint: "about",
    queries: {},
  });

  res.statusCode = 200;
  res.json({
    ...resp,
    histories: resp.histories
      .filter((h) => h.public)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
  });
};
