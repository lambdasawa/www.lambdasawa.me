import { Main } from "@/components/common/Main";
import { About, findAbout, findNote, findNotes, Note } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import parse from "html-react-parser";
import { useRouter } from "next/dist/client/router";

type Props = {
  about: About;
  note: Note;
};

export async function getStaticPaths() {
  const notes = await findNotes();

  const paths = notes.contents.map((note) => ({
    params: { id: note.id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context: { params: { id: string }; previewData: { draftKey?: string } }) {
  const [about, note] = await Promise.all([findAbout(), findNote(context.params.id, context?.previewData?.draftKey)]);

  return {
    props: {
      about,
      note,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Main title={buildTitle(props.note.title)} about={props.about}>
      <div className="blog">{parse(props?.note?.htmlContent)}</div>
    </Main>
  );
}
