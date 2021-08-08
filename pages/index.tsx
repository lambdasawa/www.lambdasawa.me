import Head from "next/head";
import { About, apiURLs, Products } from "@/utils/api";
import { Link } from "@/components/common/Link";

type Props = {
  about: About;
  products: Products;
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
        title: `${p.title}をリリースしました。`,
        link: p.link,
        detail: p.detail,
      };
    }),
  ].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
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
    },
  };
}

export default function Home(props: Props): JSX.Element {
  return (
    <div className="bg-gray-900 text-white">
      <Head>
        <title>λ沢.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <div className="p-4">
          <div>ID: {props.about.handleName}</div>
        </div>
        <div className="flex flex-wrap p-4">
          {props.about.links.map((link, i) => (
            <div className={i === 0 ? "py-1 pr-1" : "p-1"} key={link.link}>
              <Link href={link.link} text={link.name} />
            </div>
          ))}
          <div className="p-1">
            <Link href={`mailto:${props.about.mailAddress}`} text={"Email"} />
          </div>
        </div>
        <div>
          <ul>
            {buildTimeline(props).map((timeline) => (
              <li className="p-4 pb-8" key={timeline.title}>
                <div className="pl-1 text-xs text-gray-400">
                  {buildTimelineDate(timeline)}
                </div>
                <div className="pl-1">
                  <span>
                    {timeline.link ? (
                      <Link href={timeline.link} text={timeline.title} />
                    ) : (
                      <span>{timeline.title}</span>
                    )}
                  </span>
                </div>
                <div className="p-1 whitespace-pre-wrap">{timeline.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
