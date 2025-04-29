"use client";
import React from "react";
import FloatingNavbar from "@/components/ui/floating-navbar";
import Navbar from "@/components/ui/navbar";
import VideoComponent from "@/components/ui/video-component";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Course {
  id: number;
  course_name: string;
  description: string;
  dificulty: string;
  length: number;
  video: string;
}

export default function DriveVideoPage() {
  const { id } = useParams();
  const [courses, setCourses] = useState<Course | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchCourses() {
      let { data, error } = await supabase
        .from("MsCourses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching courses:", error.message);
      } else {
        setCourses(data || []);
      }
    }

    fetchCourses();
  }, [supabase]);

  return (
    <div className="relative w-full">
      <Navbar />
      <FloatingNavbar />
      <div className="my-12 flex flex-col justify-center items-center">
        <h3 className="text-xl text-black dark:text-white text-center md:text-left max-w-3/4">
          Learn
        </h3>
        <h2 className="text-3xl font-bold text-black dark:text-white py-5 text-center md:text-left max-w-3/4">
          {courses?.course_name}
        </h2>
      </div>
      <div className="flex justify-center ">
        <VideoComponent src={courses?.video} className="w-2xl" />
      </div>

      <Link href="/learn_question">
        <div className="my-12 flex flex-row justify-center items-center">
          <h2 className="text-3xl font-bold text-black dark:text-white px-5 text-center md:text-left max-w-3/4">
            Next
          </h2>
          <IconArrowRight
            size={50}
            stroke={2}
            className="hover:cursor-pointer"
          />
        </div>
      </Link>
    </div>
  );
}
