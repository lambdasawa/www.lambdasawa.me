import Head from "next/head";
import styles from "../styles/Home.module.css";
import { About, apiURLs, Products } from "@/utils/api";

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
        title: h.title,
        detail: h.detail,
      };
    }),
    ...props.products.contents.map<Timeline>((p) => {
      return {
        startDate: new Date(p.releaseDate),
        title: `${p.title}をリリース`,
        link: p.link,
        detail: p.detail,
      };
    }),
  ].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
}

export async function getServerSideProps(context) {
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
    <div className={styles.container}>
      <Head>
        <title>λ沢.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div>{props.about.handleName}</div>
        </div>
        <div>
          <ul>
            {props.about.links.map((link) => (
              <li key={link.link}>
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${props.about.mailAddress}`}>Email</a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {buildTimeline(props).map((timeline) => (
              <li key={timeline.title}>
                <div>
                  {timeline.startDate.toDateString()}
                  {" ~ "}
                  {timeline?.endDate?.toDateString() ?? ""}
                </div>
                {timeline.link ? (
                  <div>
                    <a href={timeline.link}>{timeline.title}</a>
                  </div>
                ) : (
                  <div>{timeline.title}</div>
                )}
                <div>{timeline.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
