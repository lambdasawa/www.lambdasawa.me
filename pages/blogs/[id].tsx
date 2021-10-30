import { Main } from "@/components/common/Main";
import { About, BlogContent, findAbout, findBlogContent, findBlogContents } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import marked from "marked";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Highlight from "react-highlight";
import parse from "html-react-parser";

marked.use({
  renderer: {
    heading(text, level, raw) {
      const prefix = "#".repeat(level) + " ";
      const id = encodeURIComponent(raw);
      return `
        <h${level} id="${id}">
          <a href="#${id}">${prefix}</a>
          <span>${text}</span>
        </h${level}>
      `;
    },
  },
});

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

  console.log(`https://lambdasawa-blog.microcms.io/apis${router.asPath.replace("blogs", "blog-contents")}`);

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
        {props?.blogContent?.htmlContent ? (
          parse(props?.blogContent?.htmlContent)
        ) : (
          <Highlight innerHTML={true}>
            {marked(props?.blogContent?.mdContent || "", {
              gfm: true,
              breaks: true,
              headerIds: true,
            })}
          </Highlight>
        )}
      </div>
    </Main>
  );
}
