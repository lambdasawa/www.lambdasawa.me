import { createClient } from "microcms-js-sdk";
import { About, Timeline, TimelineItem } from "./types";

export const origin = process.env.ORIGIN || "http://localhost:3000";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export async function fetchAbout(): Promise<About> {
  return client.get<About>({
    endpoint: "about",
    queries: {},
  });
}

export function fetchTimeline(): Promise<Timeline> {
  return client.getList<TimelineItem>({
    endpoint: "timeline",
    queries: {
      orders: "-publishedAt",
      limit: 100,
    },
  });
}

export function fetchTimelineItem(id: string, draftKey?: string): Promise<TimelineItem> {
  return client.get<TimelineItem>({
    endpoint: "timeline",
    contentId: id,
    queries: {
      draftKey,
    },
  });
}
