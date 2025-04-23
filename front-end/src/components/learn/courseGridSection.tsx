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

export default function courseGridSection() {
  return (
    <div className="my-12 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-black dark:text-white my-5 text-center md:text-left max-w-3/4">
        Courses
      </h2>
      <div className="mx-auto grid max-w-3/4 grid-cols-1 gap-6 md:auto-rows-[18rem] md:grid-cols-3  my-12">
        {/* <h2 className="text-3xl font-bold text-black dark:text-white max-w-4xl mx-auto my-5 text-center md:text-left justify-around">
        Continue Lesson
      </h2> */}

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
      </div>
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
    links: "/learn_start",
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
