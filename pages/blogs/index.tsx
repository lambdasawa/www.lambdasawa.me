import { Header } from "@/components/common/Header";
import { Link } from "@/components/common/Link";
import { About, apiURLs, BlogContents } from "@/utils/api";
import { formatDate } from "@/utils/formatter";
import { buildTitle } from "@/utils/title";
import Head from "next/head";

type Props = {
  about: About;
  blogContents: BlogContents;
};

export async function getServerSideProps() {
  return {
    props: {
      about: await fetch(apiURLs.about).then<About>((res) => res.json()),
      blogContents: await fetch(apiURLs.blogContents).then<BlogContents>(
        (res) => res.json()
      ),
    },
  };
}

export default function Home(props: Props): JSX.Element {
  return (
    <div className="bg-gray-900 text-white">
      <Head>
        <title>{buildTitle("ブログ")}</title>
      </Head>

      <main className="min-h-screen min-h-screen container mx-auto px-4">
        <Header about={props.about} />
        <div>
          {props.blogContents.contents.map((content) => (
            <div>
              <span className="px-1 text-xs text-gray-400">
                {formatDate(new Date(content.releaseDate))}
              </span>
              <Link href={`/blogs/${content.id}`} text={content.title} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
