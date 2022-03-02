import { Main } from "@/components/common/Main";
import { About, BlogContent, findAbout, findBlogContent, findBlogContents } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import marked from "marked";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Highlight from "react-highlight";
import { init } from "@/utils/markdown";

init();

type Props = {
  about: About;
  blogContent: BlogContent;
};

export async function getStaticPaths() {
  const blogContents = await findBlogContents();

  const paths = blogContents.contents.map((content) => ({
    params: { id: content.id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context: { params: { id: string }; previewData: { draftKey?: string } }) {
  const [about, blogContent] = await Promise.all([
    findAbout(),
    findBlogContent(context.params.id, context?.previewData?.draftKey),
  ]);

  return {
    props: {
      about,
      blogContent,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const content = props?.blogContent?.content?.[0];

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
        {content.fieldId === "markdown" ? (
          <Highlight innerHTML={true}>
            {marked(content.body, {
              gfm: true,
              breaks: true,
              headerIds: true,
            })}
          </Highlight>
        ) : (
          <></>
        )}
      </div>
    </Main>
  );
}
