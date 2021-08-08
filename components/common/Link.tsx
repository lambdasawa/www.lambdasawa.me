import NextLink from "next/link";

type Props = {
  href: string;
  text: string;
};

export function Link(props: Props): JSX.Element {
  return props.href.startsWith("/") ? (
    <span className="text-blue-300">
      <NextLink href={props.href}>{props.text}</NextLink>
    </span>
  ) : (
    <a className="text-blue-300" href={props.href}>
      {props.text}
    </a>
  );
}
