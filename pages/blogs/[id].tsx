import { Main } from "@/components/common/Main";
import { About, apiURLs, BlogContent } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import marked from "marked";
import Head from "next/head";
import Highlight from "react-highlight";

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
    <Main title={buildTitle(props.blogContent.title)} about={props.about}>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/monokai.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="blog">
        <h1>{props.blogContent.title}</h1>
        <Highlight innerHTML={true}>
          {marked(props?.blogContent?.content || "", {
            gfm: true,
            breaks: true,
            headerIds: true,
          })}
        </Highlight>
      </div>
    </Main>
  );
}
