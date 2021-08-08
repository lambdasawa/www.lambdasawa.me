import NextLink from "next/link";

type Props = {
  href: string;
  text: string;
};

export function Link(props: Props): JSX.Element {
  return props.href.startsWith("/") ? (
    <NextLink href={props.href}>{props.text}</NextLink>
  ) : (
    <a className="underline" href={props.href}>
      {props.text}
    </a>
  );
}
