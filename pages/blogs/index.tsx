import { Main } from "@/components/common/Main";
import { Timeline } from "@/components/common/Timeline";
import { About, BlogContents, findAbout, findBlogContents } from "@/utils/api";
import { formatDate } from "@/utils/formatter";
import { buildTitle } from "@/utils/title";

type Props = {
  about: About;
  blogContents: BlogContents;
};

export async function getStaticProps() {
  const [about, blogContents] = await Promise.all([
    await findAbout(),
    await findBlogContents(),
  ]);

  return {
    props: {
      about,
      blogContents,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  return (
    <Main title={buildTitle("ブログ")} about={props.about}>
      <Timeline
        items={props.blogContents.contents.map((c) => {
          return {
            date: formatDate(new Date(c.releaseDate)),
            text: c.title,
            link: `/blogs/${c.id}`,
          };
        })}
      />
    </Main>
  );
}
