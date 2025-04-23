"use client";
import React from "react";
import FloatingNavbar from "@/components/ui/floating-navbar";
import Navbar from "@/components/ui/navbar";
import VideoComponent from "@/components/ui/video-component";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default function DriveVideoPage() {
  const videoURL =
    "https://1drv.ms/v/c/25890f79e0c78eb6/IQRyWjKQVPYgQIGykaRMWogNAT7utd1qvR5ebmR3BTuTWNY";
  return (
    <div className="relative w-full">
      <Navbar />
      <FloatingNavbar />
      <div className="my-12 flex flex-col justify-center items-center">
        <h3 className="text-xl text-black dark:text-white text-center md:text-left max-w-3/4">
          Learn
        </h3>
        <h2 className="text-3xl font-bold text-black dark:text-white py-5 text-center md:text-left max-w-3/4">
          Alphabet Basics
        </h2>
      </div>
      <div className="flex justify-center ">
        <VideoComponent src={videoURL} className="w-2xl" />
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
