import { Main } from "@/components/common/Main";
import { Timeline } from "@/components/common/Timeline";
import { About, apiURLs, BlogContents, Products } from "@/utils/api";
import { formatDate } from "@/utils/formatter";

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
    <Main about={props.about}>
      <Timeline
        items={buildTimeline(props).map((t) => {
          return {
            date: buildTimelineDate(t),
            text: t.title,
            link: t.link,
          };
        })}
      />
    </Main>
  );
}
