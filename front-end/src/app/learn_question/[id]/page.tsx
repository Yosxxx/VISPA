"use client";

import Image from "next/image";
import { useState } from "react";
import FloatingNavbar from "@/components/ui/floating-navbar";
import Navbar from "@/components/ui/navbar";
import VideoComponent from "@/components/ui/video-component";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

const videoURL =
  "https://1drv.ms/v/c/25890f79e0c78eb6/IQRyWjKQVPYgQIGykaRMWogNAT7utd1qvR5ebmR3BTuTWNY"; //Link video

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

export default function QuizPage() {
  const { id } = useParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchQuestion() {
      const { data, error } = await supabase
        .from("Questions")
        .select("*, MsCourses(course_name, video)")
        .eq("course_id", id);

      if (error) {
        console.error("Error fetching question:", error.message);
      } else {
        console.log(data);
        setQuestions(data);
      }
    }

    fetchQuestion();
  }, [supabase]);

  const handleCheckAnswer = () => {
    if (selected !== null) {
      setAnswered(true);
      setIsCorrect(selected === questions[questionIndex].correct);
    }
  };

  const handleNextQuestion = () => {
    if (isCorrect == true) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setSelected(null);
      setAnswered(false);
      setIsCorrect(null);
    }
  };

  return (
    <div className="relative w-full">
      <Navbar />
      <FloatingNavbar />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-black dark:text-white mt-10 text-center md:text-left max-w-3/4">
          {questions[questionIndex]?.MsCourses.course_name}
        </h2>
        <main className="flex items-center mt-10 justify-center bg-gray-50 p-4">
          <div className="flex justify-center bg-white shadow-lg rounded-lg p-6 max-w-7xl  gap-6">
            {/* Video/Image */}
            <div className="flex justify-center ">
              <VideoComponent
                src={questions[questionIndex]?.video}
                className="w-xl"
              />
            </div>

            {/* Question & Options */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                {questions[questionIndex]?.title}
              </h2>

              <div className="space-y-3">
                {questions[questionIndex]?.options.option.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setIsCorrect(null);
                      setAnswered(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all
                        ${
                          selected === option
                            ? "bg-blue-100 border-blue-500 text-blue-800 font-semibold"
                            : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                        }
                          ${
                            selected === option && isCorrect === false
                              ? "bg-red-100 border-red-500 text-red-800"
                              : ""
                          }
                          ${
                            selected === option && isCorrect === true
                              ? "bg-green-100 border-green-500 text-green-800"
                              : ""
                          }
                      `}
                  >
                    <span className="font-medium mr-2">{option}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <div className="mt-4 text-center">
                  {isCorrect ? (
                    <div className="text-green-600 font-semibold">
                      Correct! 🎉
                      <p className="mt-2 text-sm text-gray-600">
                        {selected} is the correct answer
                      </p>
                    </div>
                  ) : (
                    <div className="text-red-600 font-semibold">
                      Incorrect! 😞
                      <p className="mt-2 text-sm text-gray-600">
                        {selected} is not the correct answer
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
        <div className="flex flex-row gap-8 mt-10">
          <Button
            onClick={handleCheckAnswer}
            size="xl"
            className="mx-auto  bg-blue-500 text-white py-3 rounded-lg transition-all hover:bg-blue-600 hover:cursor-pointer"
            asChild
          >
            <p className="text-2xl">Sumbit</p>
          </Button>
          {answered && isCorrect && (
            <Button
              onClick={handleNextQuestion}
              size="xl"
              className="mx-auto  bg-blue-500 text-white py-3 rounded-lg transition-all hover:bg-blue-600"
              asChild
            >
              <p className="text-2xl">
                Next{" "}
                <IconArrowRight className="size-[25px]" size={50} stroke={2} />
              </p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
