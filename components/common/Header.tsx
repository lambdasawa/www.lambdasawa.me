import { About } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";

type Props = {
  about: About;
};

export default function Header({ about }: Props) {
  return (
    <div>
      <Head>
        <title>λ沢.me</title>
      </Head>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl">λ沢.me</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            {about.links.map(({ link, name }) => (
              <li key={link}>
                <Link href={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
