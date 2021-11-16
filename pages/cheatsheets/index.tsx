import { Link } from "@/components/common/Link";
import { Main } from "@/components/common/Main";
import { About, findAbout, findCheatseets, Cheatsheets } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import { useRouter } from "next/dist/client/router";

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
      <div>
        {props.cheatsheets.contents.map((n) => {
          const text = n.title;
          const link = `/cheatsheets/${n.id}`;
          return (
            <div key={link}>
              <Link href={link} text={text}></Link>
            </div>
          );
        })}
      </div>
    </Main>
  );
}
