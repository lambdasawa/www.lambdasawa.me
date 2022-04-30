import { Timeline } from "@/utils/api";
import Link from "next/link";
import TLItem from "./TLItem";

type Props = {
  timeline: Timeline;
};

export default function TL({ timeline }: Props) {
  return (
    <div>
      {timeline.contents.map((item) => {
        return (
          <div className="my-4" key={item.id}>
            <TLItem timelineItem={item} />
          </div>
        );
      })}
    </div>
  );
}
