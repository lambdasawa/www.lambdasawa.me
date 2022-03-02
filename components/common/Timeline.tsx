import { Link } from "./Link";

type Props = {
  items: { date: string; text: string; link?: string; isExternalLink: boolean }[];
};

export function Timeline(props: Props): JSX.Element {
  return (
    <div>
      {props.items.map(({ date, text, link, isExternalLink }) => (
        <div className="py-1" key={link}>
          <span className="px-1 text-xs text-gray-400">{date}</span>
          {link && isExternalLink ? (
            <a className="text-blue-300" href={link}>
              {text}
            </a>
          ) : link ? (
            <Link href={link} text={text} />
          ) : (
            <span>{text}</span>
          )}
        </div>
      ))}
    </div>
  );
}
