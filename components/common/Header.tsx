import { About } from "@/utils/api";
import { Link } from "./Link";

type Props = {
  about: About;
};

export function Header(props: Props): JSX.Element {
  return (
    <div>
      <div className="py-4">
        <Link href={"/"} text={"λ沢.me"} />
      </div>
      <div className="flex flex-wrap py-4">
        {props.about.links.map((link) => (
          <div className="py-1 pr-6" key={link.link}>
            <Link href={link.link} text={link.name} />
          </div>
        ))}
        <div className="p-1 pr-4">
          <Link href={`mailto:${props.about.mailAddress}`} text={"Email"} />
        </div>
      </div>
    </div>
  );
}
