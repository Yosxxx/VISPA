import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import QuizClient from "@/components/learn/quizclient";
interface Question {
  id: number;
  title: string;
  course_id: number;
  options: { option: string[] };
  correct: string;
  video: string;
  MsCourses: {
    course_name: string;
  };
}
export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: questions } = await supabase
    .from("Questions")
    .select("*, MsCourses(course_name)")
    .eq("course_id", params.id);

  return (
    <QuizClient questions={questions as Question[]} courseId={params.id} />
  );
}
