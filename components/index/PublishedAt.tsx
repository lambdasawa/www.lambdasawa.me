import { formatDate } from "@/utils/date";

export default function PublishedAt(props: { publishedAt: string }) {
  return <span className="mr-2">{formatDate(props.publishedAt)}</span>;
}
