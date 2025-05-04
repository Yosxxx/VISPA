import { cn } from "@/lib/utils";
import React from "react";
import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Image from "next/image";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Course {
  id: number;
  course_name: string;
  description: string;
  dificulty: string;
  length: number;
  image: string;
}

export default function courseGridSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchCourses() {
      let { data, error } = await supabase
        .from("MsCourses")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching courses:", error.message);
      } else {
        setCourses(data || []);
      }
    }

    fetchCourses();
  }, [supabase]);
  return (
    <div className="my-12 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-black dark:text-white my-5 text-center md:text-left max-w-3/4">
        Courses
      </h2>
      <div className="mx-auto grid max-w-3/4 grid-cols-1 gap-6 md:auto-rows-[18rem] md:grid-cols-3  my-12">
        {/* <h2 className="text-3xl font-bold text-black dark:text-white max-w-4xl mx-auto my-5 text-center md:text-left justify-around">
        Continue Lesson
      </h2> */}

        {courses.map((course, i) => (
          <BentoGridItem
            key={course.id}
            title={course.course_name}
            description={CourseDescription({
              description: course.description,
              difficulty: course.dificulty,
              length: `${course.length} minutes`,
            })}
            header={<Skeleton src={course.image} />}
            links={`/learn_start/${course.id}`}
            // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            className="h-fit"
          />
        ))}
      </div>
    </div>
  );
}
const Skeleton = ({
  src,
  alt = "Loading...",
}: {
  src?: string;
  alt?: string;
}) => {
  return src ? (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
      <img src={src} width="1024" height="auto" />
    </div>
  ) : (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 animate-pulse" />
  );
};

const CourseDescription = ({
  description,
  difficulty,
  length,
}: {
  description: string;
  difficulty: string;
  length: string;
}) => {
  const difficultyColor =
    difficulty.toLowerCase() === "easy"
      ? "text-green-500"
      : difficulty.toLowerCase() === "medium"
      ? "text-yellow-500"
      : difficulty.toLowerCase() === "hard"
      ? "text-red-500"
      : "text-gray-500"; // fallback if unknown

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4">
      <div>{description}</div>
      <div>
        <strong>Difficulty:</strong>
        <span className={difficultyColor}> {difficulty}</span>
      </div>
      <div>
        <strong>Length:</strong> {length}
      </div>
    </div>
  );
};
