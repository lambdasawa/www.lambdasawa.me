import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterClient } from "twitter-api-client";
import * as crypto from "crypto";
import { TimelineItem } from "@/utils/api";

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

function verifySignature(req: NextApiRequest) {
  const expected = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET || "")
    .update(JSON.stringify(req.body))
    .digest("hex");
  const actual = req.headers["x-microcms-signature"].toString();
  if (expected.length !== actual.length) {
    console.log("token length is invalid");
    return false;
  }

  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(actual))) {
    console.log("token is not correct");
    return false;
  }

  return true;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!verifySignature(req)) {
    return res.status(404).json({});
  }

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  console.log(JSON.stringify({ body: req.body }, null, 2));

  const body = req.body as MicroCMSWebhookEvent<TimelineItem>;
  const onNewContent = !body?.contents?.old?.publishValue && body?.contents?.new?.publishValue;

  console.log(JSON.stringify({ onNewContent }));

  if (onNewContent) {
    await twitterClient.tweets.statusesUpdate({
      status: `https://www.lambdasawa.me/posts/${body.contents.new.publishValue.id} ${body.contents.new.publishValue.title}`,
    });
  }

  res.send("OK");
};

export default handler;
