"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Course {
  id: number;
  course_name: string;
  points: number;
}

export default function CourseCompletionPage() {
  const router = useRouter();
  const { id } = useParams();
  const [courses, setCourses] = useState<Course>({} as Course);
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
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 px-4 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full space-y-6">
        <h2 className="text-gray-700 text-xl font-medium">
          🎉 Congratulations!
        </h2>
        <p className="text-gray-800 text-lg">
          You have successfully completed the course
        </p>
        <h1 className="text-4xl font-bold text-black">{courses.course_name}</h1>
        <p className="text-green-600 font-semibold text-lg">
          {courses.points} points added to your profile
        </p>
        <Button
          onClick={() => router.push("/home")}
          className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
