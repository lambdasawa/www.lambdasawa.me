import { Main } from "@/components/common/Main";
import { Timeline } from "@/components/common/Timeline";
import { About, BlogContents, findAbout, findBlogContents } from "@/utils/api";
import { formatDate } from "@/utils/formatter";
import { buildTitle } from "@/utils/title";
import { useRouter } from "next/dist/client/router";

type Props = {
  about: About;
  blogContents: BlogContents;
};

export async function getStaticProps() {
  const [about, blogContents] = await Promise.all([await findAbout(), await findBlogContents()]);

  return {
    props: {
      about,
      blogContents,
    },
    revalidate: 60,
  };
}

export default function Home(props: Props): JSX.Element {
  const router = useRouter();

  return (
    <Main title={buildTitle("ブログ")} about={props.about}>
      <Timeline
        items={props.blogContents.contents.map((c) => {
          const field = c.content?.[0];
          const isExternalLink = field.fieldId === "external";

          const link = isExternalLink ? field.url : `/blogs/${c.id}`;

          return {
            date: formatDate(new Date(c.publishedAt)),
            text: c.title,
            link,
            isExternalLink,
          };
        })}
      />
    </Main>
  );
}
