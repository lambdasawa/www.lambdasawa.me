import Head from "next/head";
import { About, apiURLs, BlogContents, Products } from "@/utils/api";
import { Link } from "@/components/common/Link";
import { Header } from "@/components/common/Header";
import { formatDate } from "@/utils/formatter";
import { buildTitle } from "@/utils/title";

type Props = {
  about: About;
  products: Products;
  blogContents: BlogContents;
};

type Timeline = {
  startDate: Date;
  endDate?: Date;
  title: string;
  link?: string;
  detail: string;
};

function buildTimeline(props: Props): Timeline[] {
  return [
    ...props.about.histories.map<Timeline>((h) => {
      return {
        startDate: new Date(h.startDate),
        endDate: h.endDate ? new Date(h.endDate) : undefined,
        title:
          h.type[0] === "career"
            ? `${h.title}で働き始めました。`
            : h.type[0] === "education"
            ? `${h.title}に入学しました。`
            : h.type[0] === "certification"
            ? `${h.title}に合格しました。`
            : h.title,
        detail: h.detail,
      };
    }),
    ...props.products.contents.map<Timeline>((p) => {
      return {
        startDate: new Date(p.releaseDate),
        title: `プロジェクトを公開しました: ${p.title}`,
        link: p.link,
        detail: p.detail,
      };
    }),
    ...props.blogContents.contents.map<Timeline>((c) => {
      return {
        startDate: new Date(c.releaseDate),
        title: `ブログを書きました: ${c.title}`,
        link: `/blogs/${c.id}`,
        detail: "",
      };
    }),
  ].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
}

function buildTimelineDate(timeline: Timeline): string {
  const { startDate, endDate } = timeline;

  if (!endDate) return buildTimelineDate({ ...timeline, endDate: startDate });

  if (startDate.getTime() === endDate.getTime()) return formatDate(startDate);

  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
}

export async function getServerSideProps() {
  return {
    props: {
      about: await fetch(apiURLs.about).then<About>((res) => res.json()),
      products: await fetch(apiURLs.products).then<Products>((res) =>
        res.json()
      ),
      blogContents: await fetch(apiURLs.blogContents).then<BlogContents>(
        (res) => res.json()
      ),
    },
  };
}

export default function Home(props: Props): JSX.Element {
  return (
    <div className="bg-gray-900 text-white">
      <main className="min-h-screen min-h-screen container mx-auto px-4 pb-8">
        <div>
          <Header about={props.about} />
          <div>
            {buildTimeline(props).map((timeline) => (
              <div className="px-1" key={timeline.title}>
                <span className="pr-2 text-xs text-gray-400">
                  {buildTimelineDate(timeline)}
                </span>
                <span>
                  {timeline.link ? (
                    <Link href={timeline.link} text={timeline.title} />
                  ) : (
                    <span>{timeline.title}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
