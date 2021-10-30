import { BlogContent } from "@/utils/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterClient } from "twitter-api-client";

type MicroCMSWebhookContent<A> = {
  status: ("DRAFT" | "PUBLISH")[];
  publishValue: A | null;
  draftValue: A | null;
};

type MicroCMSWebhookEvent<A> = {
  type: "new" | "edit";
  contents: {
    old: MicroCMSWebhookContent<A>;
    new: MicroCMSWebhookContent<A>;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { webhookToken } = req.query;

  if (!webhookToken) return res.status(404).send("");
  if (webhookToken !== process.env.WEBHOOK_TOKEN) return res.status(404).send("");

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  console.log(JSON.stringify({ body: req.body }, null, 2));

  const body = req.body as MicroCMSWebhookEvent<BlogContent>;
  const onNewContent = !body.contents.old.publishValue && body.contents.new.publishValue;

  console.log({ onNewContent });

  if (onNewContent) {
    await twitterClient.tweets.statusesUpdate({
      status: `https://www.lambdasawa.me/blogs/${body.contents.new.publishValue.id} ${body.contents.new.publishValue.title}`,
    });
  }

  res.send("OK");
};

export default handler;
