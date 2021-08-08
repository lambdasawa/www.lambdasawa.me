import { Main } from "@/components/common/Main";
import { Timeline } from "@/components/common/Timeline";
import { About, apiURLs, BlogContents } from "@/utils/api";
import { formatDate } from "@/utils/formatter";
import { buildTitle } from "@/utils/title";

type Props = {
  about: About;
  blogContents: BlogContents;
};

export async function getServerSideProps() {
  return {
    props: {
      about: await fetch(apiURLs.about).then<About>((res) => res.json()),
      blogContents: await fetch(apiURLs.blogContents).then<BlogContents>(
        (res) => res.json()
      ),
    },
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
