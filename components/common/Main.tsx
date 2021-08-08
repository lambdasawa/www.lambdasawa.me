import { About } from "@/utils/api";
import { buildTitle } from "@/utils/title";
import Head from "next/head";
import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
  title?: string;
  about: About;
};

export function Main(props: Props) {
  return (
    <div className="bg-gray-900 text-white">
      <Head>
        <title>{props.title ?? buildTitle()}</title>
      </Head>

      <main className="min-h-screen min-h-screen container mx-auto px-4">
        <Header about={props.about} />
        <div>{props.children}</div>
      </main>
    </div>
  );
}
