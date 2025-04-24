"use client";

import React, { useEffect, useRef, useState } from "react";
import { Strings } from "@/constants/Strings";
import FloatingNavbar from "@/components/ui/floating-navbar";
import Navbar from "@/components/ui/navbar";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [handPresence, setHandPresence] = useState<boolean | null>(null);
  const [HandPrediction, setHandPrediction] = useState<string>("No Character");

  const [displayList, setDisplayList] = useState<string[]>([]);
  const [indexList, setIndexList] = useState<number>(0);
  const [prevIndexList, setPrevIndexList] = useState<number>(-1);
  const previousValueRef = useRef<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const exampleString = Strings;
  const [targetString, setTargetString] = useState<string[]>(exampleString[0]);
  const [targetStringIndex, setTargetStringIndex] = useState<number>(0);
  const [Points, setPoints] = useState<number>(0);

  useEffect(() => {
    if (indexList >= targetString.length) {
      setTargetStringIndex((i) => i + 1);
      setIndexList(0);
      setPrevIndexList(-1);
      setPoints((p) => p + 100);
      setDisplayList([]);
    }
  }, [indexList]);

  useEffect(() => {
    setTargetString(exampleString[targetStringIndex]);
  }, [targetStringIndex]);

  // Timer-based string validation logic
  useEffect(() => {
    if (previousValueRef.current !== HandPrediction) {
      previousValueRef.current = HandPrediction;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        if (
          HandPrediction !== "No Character" &&
          HandPrediction === targetString[indexList]
        ) {
          setDisplayList((l) => [...l, HandPrediction]);
          setPrevIndexList(prevIndexList === -1 ? 0 : indexList);
          setIndexList((i) => i + 1);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [HandPrediction]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const sendFrameToFlask = async () => {
      if (videoRef.current && canvasRef.current) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");

          try {
            const response = await fetch("http://127.0.0.1:5000/detect", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              setHandPresence(data.hands_detected);
              setHandPrediction(data.predicted_character);
            } else {
              console.error("Response failed:", response.statusText);
            }
          } catch (error) {
            console.error("Fetch failed", error);
          }
        }, "image/jpeg");
      }
    };

    const startInterval = () => {
      intervalId = setInterval(sendFrameToFlask, 500); // 2 frames per second
    };

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadeddata = () => {
            if (canvasRef.current && videoRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
            }
            startInterval();
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      <Navbar />
      <FloatingNavbar />
      <div className="my-12 flex flex-col justify-center items-center">
        <h3 className="text-xl text-black dark:text-white text-center md:text-left max-w-3/4">
          Predict The Word
        </h3>
        <div className="my-5 text-xl font-bold">
          {targetString.map((char, index) => (
            <span
              key={index}
              className={`${
                index <= prevIndexList ? "text-red-500" : "text-black"
              } px-2 text-4xl`}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-sm rounded-lg items-center md:w-2xl"
        />
        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "auto",
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-bold text-black dark:text-white py-5 text-center md:text-left max-w-3/4">
          {HandPrediction}
        </h2>
      </div>
    </div>
  );
};

export default Camera;
