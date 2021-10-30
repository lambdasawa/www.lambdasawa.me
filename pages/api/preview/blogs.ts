import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, draftKey } = req.query;

  if (!id) return res.status(404).send("");
  if (!draftKey) return res.status(404).send("");

  res.setPreviewData({ draftKey });
  res.redirect(`/blogs/${id}`);
};

export default handler;
