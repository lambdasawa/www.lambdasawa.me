import { Link } from "@/components/common/Link";
import { Main } from "@/components/common/Main";
import { About, findAbout, findCheatseets, Cheatsheets } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import { init } from "@/utils/markdown";
import { useRouter } from "next/dist/client/router";
import Highlight from "react-highlight";
import marked from "marked";

init();

type Props = {
  about: About;
  cheatsheets: Cheatsheets;
};

export async function getStaticProps() {
  const [about, cheatsheets] = await Promise.all([await findAbout(), await findCheatseets()]);

  return {
    props: {
      about,
      cheatsheets,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  const router = useRouter();

  console.log(`https://lambdasawa-blog.microcms.io/apis${router.asPath}`);

  return (
    <Main title={buildTitle("チートシート")} about={props.about}>
      <div className="blog">
        {props.cheatsheets.contents.map((n) => {
          return (
            <div key={n.id}>
              <h2>{`## ${n.title}`}</h2>
              <Highlight innerHTML={true}>
                {marked(n.mdContent || "", {
                  gfm: true,
                  breaks: true,
                  headerIds: true,
                })}
              </Highlight>
            </div>
          );
        })}
      </div>
    </Main>
  );
}
