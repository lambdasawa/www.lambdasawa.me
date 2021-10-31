import { Link } from "@/components/common/Link";
import { Main } from "@/components/common/Main";
import { About, findAbout, findNotes, Notes } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import { useRouter } from "next/dist/client/router";

type Props = {
  about: About;
  notes: Notes;
};

export async function getStaticProps() {
  const [about, notes] = await Promise.all([await findAbout(), await findNotes()]);

  return {
    props: {
      about,
      notes,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  const router = useRouter();

  console.log(`https://lambdasawa-blog.microcms.io/apis${router.asPath}`);

  return (
    <Main title={buildTitle("ノート")} about={props.about}>
      <div className="flex flex-wrap">
        {props.notes.contents.map((n) => {
          const text = n.title;
          const link = `/notes/${n.id}`;
          return (
            <span className="w-48 h-16 m-1" key={link}>
              <Link href={link} text={text}></Link>
            </span>
          );
        })}
      </div>
    </Main>
  );
}
