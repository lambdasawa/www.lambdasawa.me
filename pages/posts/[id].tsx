import Header from "@/components/common/Header";
import { About, fetchAbout, fetchTimeline, fetchTimelineItem, TimelineItem } from "@/utils/api";
import parse from "html-react-parser";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Props = {
  about: About;
  item: TimelineItem;
};

export async function getStaticPaths() {
  const timeline = await fetchTimeline();

  const posts = timeline.contents.filter((c) => c.content[0].fieldId.startsWith("blog"));

  const paths = posts.map((p) => `/posts/${p.id}`);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [about, item] = await Promise.all([fetchAbout(), fetchTimelineItem(params.id)]);

  return {
    props: { about, item },
  };
}

export default function Home({ about, item }: Props): JSX.Element {
  const content = item?.content[0];

  useEffect(() => {
    if (content?.fieldId === "blogExternal") {
      location.href = content.link;
    }
  });

  if (!content) return <></>;

  switch (content.fieldId) {
    case "blogMarkdown":
      return (
        <div>
          <Header about={about} />
          <div className="mx-4 mb-4">
            <h1 className="text-2xl"># {item.title}</h1>
            <div className="divider" />
            <div className="markdown">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter style={dark as any} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content?.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );

    case "blogHTML":
      return (
        <div>
          <Header about={about} />
          <div className="mx-4 mb-4">
            <h1 className="text-2xl">{item.title}</h1>
            <div className="divider" />
            {parse(content?.body)}
          </div>
        </div>
      );

    default:
      return <></>;
  }
}
