import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export default function ContinueCourseSection() {
  return (
    <div className="my-24">
      <h2 className="text-2xl font-bold text-black dark:text-white max-w-4xl mx-auto my-5 text-center md:text-left">
        Continue Lesson
      </h2>
      <BentoGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            links={item.links}
            // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Beginner Course",
    description: "Learn the alphabet and numbers in sign language.",
    header: <Skeleton />,
    links: "course1",
  },
  {
    title: "Intermediate Course",
    description: "Build your vocabulary with common everyday words.",
    header: <Skeleton />,
    links: "course1",
  },
  {
    title: "Advanced Course",
    description: "Master complex words and develop conversational skills.",
    header: <Skeleton />,
    links: "course1",
  },
];
