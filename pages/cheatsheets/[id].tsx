import { Main } from "@/components/common/Main";
import { About, findAbout, findCheatsheet, findCheatseets, Cheatsheet } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import { init } from "@/utils/markdown";
import marked from "marked";
import { useRouter } from "next/dist/client/router";
import Highlight from "react-highlight";

init();

type Props = {
  about: About;
  cheatsheet: Cheatsheet;
};

export async function getStaticPaths() {
  const cheatsheets = await findCheatseets();

  const paths = cheatsheets.contents.map((cheatsheet) => ({
    params: { id: cheatsheet.id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context: { params: { id: string }; previewData: { draftKey?: string } }) {
  const [about, cheatsheet] = await Promise.all([
    findAbout(),
    findCheatsheet(context.params.id, context?.previewData?.draftKey),
  ]);

  return {
    props: {
      about,
      cheatsheet,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log(`https://lambdasawa-blog.microcms.io/apis${router.asPath}`);

  return (
    <Main title={buildTitle(props.cheatsheet.title)} about={props.about}>
      <div className="blog">
        <h1>{props.cheatsheet.title}</h1>
        {
          <Highlight innerHTML={true}>
            {marked(props?.cheatsheet?.mdContent || "", {
              gfm: true,
              breaks: true,
              headerIds: true,
            })}
          </Highlight>
        }
      </div>
    </Main>
  );
}
