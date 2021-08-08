import { Link } from "./Link";

type Props = {
  items: { date: string; text: string; link?: string }[];
};

export function Timeline(props: Props): JSX.Element {
  return (
    <div>
      {props.items.map(({ date, text, link }) => (
        <div className="py-1">
          <span className="px-1 text-xs text-gray-400">{date}</span>
          {link ? <Link href={link} text={text} /> : <span>{text}</span>}
        </div>
      ))}
    </div>
  );
}
