import { Main } from "@/components/common/Main";
import { Timeline } from "@/components/common/Timeline";
import { About, BlogContents, findAbout, findBlogContents, findProducts, Products } from "@/utils/api";
import { formatDate } from "@/utils/formatter";
import { buildTitle } from "@/utils/title";
import Head from "next/head";

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
  isExternalLink: boolean;
};

function buildTimeline(props: Props): Timeline[] {
  return [
    ...props.about.histories.map<Timeline>((h) => {
      return {
        startDate: new Date(h.startDate),
        endDate: h.endDate ? new Date(h.endDate) : undefined,
        title:
          h.type[0] === "talk"
            ? `「${h.title}」というタイトルで発表しました。`
            : h.type[0] === "career"
            ? `${h.title}で働き始めました。`
            : h.type[0] === "education"
            ? `${h.title}に入学しました。`
            : h.type[0] === "certification"
            ? `${h.title}に合格しました。`
            : h.title,
        detail: h.detail,
        isExternalLink: false,
      };
    }),
    ...props.products.contents.map<Timeline>((p) => {
      return {
        startDate: new Date(p.publishedAt),
        title: `プロジェクトを公開しました: ${p.title}`,
        link: p.link,
        detail: p.detail,
        isExternalLink: false,
      };
    }),
    ...props.blogContents.contents.map<Timeline>((c) => {
      const field = c.content?.[0];
      const isExternalLink = field.fieldId === "external";

      const link = isExternalLink ? field.url : `/blogs/${c.id}`;

      return {
        startDate: new Date(c.publishedAt),
        title: `ブログを書きました: ${c.title}`,
        link,
        detail: "",
        isExternalLink,
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

export async function getStaticProps() {
  const [about, products, blogContents] = await Promise.all([findAbout(), findProducts(), findBlogContents()]);

  return {
    props: {
      about,
      products,
      blogContents,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  return (
    <Main about={props.about}>
      <Head>
        <title>{buildTitle()}</title>
      </Head>

      <Timeline
        items={buildTimeline(props).map((t) => {
          return {
            date: buildTimelineDate(t),
            text: t.title,
            link: t.link,
            isExternalLink: t.isExternalLink,
          };
        })}
      />
    </Main>
  );
}
