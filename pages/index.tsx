import Header from "@/components/common/Header";
import TL from "@/components/index/TL";
import { About, fetchAbout, fetchTimeline, Timeline } from "@/utils/api";

type Props = {
  about: About;
  timeline: Timeline;
};

export async function getStaticProps() {
  const [about, timeline] = await Promise.all([fetchAbout(), fetchTimeline()]);

  return {
    props: { about, timeline },
    revalidate: 60,
  };
}

export default function Home({ about, timeline }: Props): JSX.Element {
  return (
    <div>
      <Header about={about} />
      <div className="mx-4">
        <TL timeline={timeline}></TL>
      </div>
    </div>
  );
}
