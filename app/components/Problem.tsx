import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Activity,
  CircleX,
  Clock,
  FolderOpen,
  Hourglass,
  PencilOff,
  RefreshCcw,
  ScanText,
  Timer,
  Workflow,
} from "lucide-react";
import React, { ReactElement } from "react";

interface IProblem {
  text: string;
  bgColor: string;
  textColor: string;
  logo: ReactElement;
}

const problems: IProblem[] = [
  {
    text: "Lack of seamless AI automation",
    bgColor: "bg-fuchsia-100",
    textColor: "text-fuchsia-700",
    logo: <Workflow size={24} />,
  },
  {
    text: "Scanned text contains errors and distortions",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    logo: <CircleX size={24} />,
  },
  {
    text: "No quick access to older processed notes",
    bgColor: "bg-pink-100",
    textColor: "text-pink-700",
    logo: <Activity size={24} />,
  },
  {
    text: "Disrupted workflow and wasted time",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    logo: <Clock size={24} />,
  },
  {
    text: "OCR struggled with unclear writing",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    logo: <ScanText size={24} />,
  },
  {
    text: "No single place to manage all notes",
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
    logo: <FolderOpen size={24} />,
  },
  {
    text: "Disrupted workflow and wasted time",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    logo: <Timer size={24} />,
  },
  {
    text: "No single place to manage all notes",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    logo: <FolderOpen size={24} />,
  },
  {
    text: "Lack of seamless AI automation",
    bgColor: "bg-violet-100",
    textColor: "text-violet-700",
    logo: <Workflow size={24} />,
  },
  {
    text: "Inability to modify the scanned notes",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
    logo: <PencilOff size={24} />,
  },
  {
    text: "Re-upload notes each time for AI assistance",
    bgColor: "bg-sky-100",
    textColor: "text-sky-700",
    logo: <RefreshCcw size={24} />,
  },
  {
    text: "Wasted time switching to different apps",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    logo: <Hourglass size={24} />,
  },
];

const Problem = () => {
  return (
    <div className="w-full h-screen flex relative flex-col mt-14 gap-2 items-center">
      <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
        <RainbowButton
          disabled={true}
          className="cursor-default border-t-2 rounded-full"
        >
          The Problem
        </RainbowButton>
      </div>

      <h1 className="text-center text-[5vw] leading-[6vw] text-zinc-900  font-medium tracking-tighter">
        Lack of a seamless note system
      </h1>

      <div className="grid w-full h-fit grid-rows-2 gap-4 mt-4 relative grid-cols-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>

        {problems.map((problem, i) => (
          <div
            key={i}
            className="rounded-2xl aspect-square border-2 border-gray-200 shadow-lg flex"
          >
            <div className="w-full h-full flex items-center justify-center p-4 gap-[15%] flex-col">
              <p
                className={`${problem.bgColor} ${problem.textColor}  rounded-full px-8 p-3 text-2xl`}
              >
                {problem.logo}
              </p>
              <span className="text-md text-center">{problem.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problem;
