import { About, apiURLs, BlogContent } from "@/utils/api";
import Head from "next/head";
import marked from "marked";
import Highlight from "react-highlight";
import { Header } from "@/components/common/Header";

type Props = {
  about: About;
  blogContent: BlogContent;
};

export async function getServerSideProps(context) {
  return {
    props: {
      about: await fetch(apiURLs.about).then<About>((res) => res.json()),
      blogContent: await fetch(
        apiURLs.blogContentDetail(context.params.id)
      ).then<BlogContent>((res) => res.json()),
    },
  };
}

export default function Home(props: Props): JSX.Element {
  return (
    <div className="bg-gray-900 text-white">
      <Head>
        <title>λ沢.me | {props.blogContent.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/monokai.min.css"
          rel="stylesheet"
        />
      </Head>

      <main className="min-h-screen min-h-screen container mx-auto px-4">
        <Header about={props.about} />

        <div className="blog">
          <h1>{props.blogContent.title}</h1>
          <Highlight innerHTML={true}>
            {marked(props?.blogContent?.content || "")}
          </Highlight>
        </div>
      </main>
    </div>
  );
}
