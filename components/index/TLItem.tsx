import { TimelineItem } from "@/utils/api";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import PublishedAt from "./PublishedAt";

type Props = {
  timelineItem: TimelineItem;
};

export default function TLItem({ timelineItem }: Props) {
  const { id, publishedAt, title, content } = timelineItem;

  const item = content[0];

  switch (item.fieldId) {
    case "blogMarkdown":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={`/posts/${id}`}>{title}</Link>
          </span>
        </div>
      );

    case "blogHTML":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={`/posts/${id}`}>{title}</Link>
          </span>
        </div>
      );

    case "blogExternal":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={item.link}>{title}</Link>
          </span>
        </div>
      );

    case "talk":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={item.slideLink}>{`「${title}」というタイトルで発表しました`}</Link>
          </span>
        </div>
      );

    case "certification":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={item.link}>{`${title}に合格しました`}</Link>
          </span>
        </div>
      );

    case "release":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={item.repositoryLink}>{`${title}をリリースしました`}</Link>
          </span>
        </div>
      );

    case "workingAt":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={item.link}>{`${title}で働き始めました`}</Link>
          </span>
        </div>
      );

    case "graduatedFrom":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          <span className="link link-hover">
            <Link href={item.link}>{`${title}に入学しました`}</Link>
          </span>
        </div>
      );

    case "other":
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          {title}
        </div>
      );

    default:
      return (
        <div>
          <PublishedAt publishedAt={publishedAt} />
          {title}
        </div>
      );
  }
}
