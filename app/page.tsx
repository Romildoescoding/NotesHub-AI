import React from "react";
import { BackgroundBoxesDemo } from "@/components/ui/Hero";
import {
  AlignLeft,
  Bold,
  FileText,
  MessageCircle,
  MessageCircleMore,
  Pen,
  Pencil,
  ScanLine,
  ScanSearch,
  Send,
  Sparkles,
  TextCursor,
  Timer,
  WandSparkles,
} from "lucide-react";
import Footer from "./components/Footer";
import Image from "next/image";
import { MarqueeDemo } from "./components/Testimonials";
import BentorGrid from "./components/BentorGrid";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Problem from "./components/Problem";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <BackgroundBoxesDemo />
      <Problem />
      <div className="w-full h-screen flex relative flex-col justify-center gap-2 items-center">
        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="cursor-default border-t-2 rounded-full"
          >
            The Solution
          </RainbowButton>
        </div>

        <h1 className="text-center text-[5vw] leading-[6vw] text-zinc-900  font-medium tracking-tighter">
          <span>NoteCraft AI is an all-in-one</span>{" "}
          <span>notes management application.</span>
        </h1>
        <span className="text-xl text-zinc-600">
          Take a look at what NoteCraft AI offers you as a service
        </span>
      </div>

      {/* OCR Scanner */}
      <div className="w-full h-fit px-[10vw] pt-[25vh] pb-[5vh] flex relative flex-col justify-center gap-2 items-center">
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[24deg] scale-[1.25]">
          {" "}
          <ScanLine size={48} />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all right-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1.25]">
          {" "}
          <ScanSearch size={48} />
        </div>

        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[30%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <ScanSearch size={48} />
        </div>

        <div className="p-4 blur-[1px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[25%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <ScanLine size={48} />
        </div>

        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="cursor-default border-t-2 rounded-full"
          >
            OCR Scanner
          </RainbowButton>
        </div>

        <h1 className="text-center text-[5vw] leading-[6vw] text-zinc-900  flex flex-col font-medium tracking-tighter">
          <span>Scan your notes and get</span>{" "}
          <span>the results in the editor</span>
        </h1>

        <div className="mt-12 w-full aspect-video rounded-xl bg-black"></div>
      </div>

      {/* Editor Interface */}
      <div className="w-full h-fit px-[10vw] pt-[25vh] pb-[5vh] flex relative flex-col justify-center gap-2 items-center">
        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1.25]">
          {" "}
          <Bold size={48} />
        </div>
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all right-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[18deg] scale-[1.25]">
          {" "}
          <Pencil size={48} />
        </div>

        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[30%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <AlignLeft size={48} />
        </div>

        <div className="p-4 blur-[3px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[25%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <TextCursor size={48} />
        </div>

        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="cursor-default border-t-2 rounded-full"
          >
            Editor Interface
          </RainbowButton>
        </div>

        <h1 className="text-center text-[5vw] leading-[6vw] text-zinc-900  flex flex-col font-medium tracking-tighter">
          <span>Refine your scanned notes</span>{" "}
          <span>using a Markdown-based editor.</span>
        </h1>

        <div className="mt-12 w-full aspect-video rounded-xl bg-black"></div>
      </div>

      {/* Chat with AI */}
      <div className="w-full h-fit px-[10vw] pt-[25vh] pb-[5vh] flex relative flex-col justify-center gap-2 items-center">
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[24deg] scale-[1.25]">
          {" "}
          <Sparkles size={48} />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all right-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1.25]">
          {" "}
          <Send size={48} />
        </div>

        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[30%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <MessageCircleMore size={48} />
        </div>

        <div className="p-4 blur-[1px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[25%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <WandSparkles size={48} />
        </div>

        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="cursor-default border-t-2 rounded-full"
          >
            AI Chat
          </RainbowButton>
        </div>

        <h1 className="text-center text-[5vw] leading-[6vw] text-zinc-900 flex flex-col font-medium tracking-tighter">
          <span>Turn your notes into a conversation</span>
          <span>with intelligent AI assistance.</span>
        </h1>

        <div className="mt-12 w-full aspect-video rounded-xl bg-black"></div>
      </div>

      {/* CALL-TO-ACTION */}
      <div className="cta-section w-full h-screen overflow-hidden  px-[10vw] pb-[5vh] flex relative flex-col justify-center gap-4 items-center">
        <div className="notes-left-1 flex flex-col gap-[3%] w-[25vw] rounded-md aspect-[2/3] border-2 shadow-md bg-white absolute -left-[15%] top-1/2 -translate-y-1/2 -rotate-12 p-[2%] z-[3]">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="w-full h-[1%] rounded-full bg-zinc-400"></p>
          ))}
        </div>
        <div className="notes-left-2 flex flex-col gap-[3%] w-[25vw] rounded-md aspect-[2/3] border-2 shadow-md bg-white absolute -left-[15%] top-1/2 -translate-y-1/2 -rotate-12 p-[2%] z-[2]">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="w-full h-[1%] rounded-full bg-zinc-400"></p>
          ))}
        </div>
        <div className="notes-left-3 flex flex-col gap-[3%] w-[25vw] rounded-md aspect-[2/3] border-2 shadow-md bg-white absolute -left-[15%] top-1/2 -translate-y-1/2 -rotate-12 p-[2%] z-[1]">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="w-full h-[1%] rounded-full bg-zinc-400"></p>
          ))}
        </div>
        <div className="notes-right-1 flex flex-col gap-[3%] w-[25vw] rounded-md aspect-[2/3] border-2 shadow-md bg-white absolute -right-[15%] top-1/2 -translate-y-1/2 rotate-12 p-[2%] z-[3]">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="w-full h-[1%] rounded-full bg-zinc-400"></p>
          ))}
        </div>
        <div className="notes-right-2 flex flex-col gap-[3%] w-[25vw] rounded-md aspect-[2/3] border-2 shadow-md bg-white absolute -right-[15%] top-1/2 -translate-y-1/2 rotate-12 p-[2%] z-[2]">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="w-full h-[1%] rounded-full bg-zinc-400"></p>
          ))}
        </div>
        <div className="notes-right-3 flex flex-col gap-[3%] w-[25vw] rounded-md aspect-[2/3] border-2 shadow-md bg-white absolute -right-[15%] top-1/2 -translate-y-1/2 rotate-12 p-[2%] z-[1]">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="w-full h-[1%] rounded-full bg-zinc-400"></p>
          ))}
        </div>
        <h1 className="text-center text-[5vw] leading-[5vw] text-zinc-900 flex flex-col font-medium tracking-tighter">
          <span>Ready to transform the way</span>
          <span>you manage notes?</span>
        </h1>
        <span className="flex flex-col">
          <span className="text-xl">
            Unlock AI-powered efficiency to structure, retrieve,
          </span>
          <span className="text-xl">
            and engage with your notes like never before.
          </span>
        </span>
        <Link href="/dashboard" className="cta-btn">
          <RainbowButton className="ml-2 py-8 px-12 text-2xl rounded-full">
            Get Started
          </RainbowButton>
        </Link>
      </div>

      {/* <BentorGrid /> */}
      {/* <MarqueeDemo /> */}

      {/* <div className="w-full h-screen bg-white flex flex-col gap-4 items-center justify-center">
        <h1 className="text-7xl font-semibold">How it works</h1>
        <p className="text-2xl text-zinc-500">
          NoteCraft AI is the AI powered Notes Manager you needed.
        </p>
        <div className="h-fit py-8 w-full flex gap-4 justify-center">
          <div className=" max-w-[30vw] text-md shadow-xl rounded-xl h-fit flex flex-col gap-2 items-center text-center py-12 p-8">
            <div className="text-2xl flex items-center flex-col gap-4">
              <div className="rounded-xl border w-fit h-fit p-3 border-gray-300 relative">
                <span className="absolute text-base -bottom-[10px] -right-[10px] border-2 border-white rounded-full h-7 w-7 bg-zinc-900 text-white">
                  1
                </span>
                <ScanLine size={44} />
              </div>
              <span className="font-semibold">Scan Notes</span>
            </div>
            <p>
              Scan your handwritten notes via the upload section to process them
              and access an editor for easy modifications.
            </p>
          </div>

          <div className=" max-w-[30vw] text-md shadow-xl rounded-xl h-fit flex flex-col gap-2 items-center text-center py-12 p-8">
            <div className="text-2xl flex items-center flex-col gap-4">
              <div className="rounded-xl border w-fit h-fit p-3 border-gray-300 relative">
                <span className="absolute text-base -bottom-[10px] -right-[10px] border-2 border-white rounded-full h-7 w-7 bg-zinc-900 text-white">
                  2
                </span>
                <Pencil size={44} />
              </div>
              <span className="font-semibold">Editor Preview</span>
            </div>
            <p>
              Utilize the editor preview feature to seamlessly review and refine
              your scanned notes after processing.
            </p>
          </div>

          <div className=" max-w-[30vw] text-md shadow-xl rounded-xl h-fit flex flex-col gap-2 items-center text-center py-12 p-8">
            <div className="text-2xl flex items-center flex-col gap-4">
              <div className="rounded-xl border w-fit h-fit p-3 border-gray-300 relative">
                <span className="absolute text-base -bottom-[10px] -right-[10px] border-2 border-white rounded-full h-7 w-7 bg-zinc-900 text-white">
                  3
                </span>
                <Sparkles size={44} />
              </div>
              <span className="font-semibold">Chat with AI</span>
            </div>
            <p>
              Engage in conversations with AI to gain insights or ask questions
              regarding your notes effortlessly.
            </p>
          </div>
        </div>
      </div> */}
      {/* TESTIMONIALS */}
      {/* DETAILS */}
      {/* GET STARTED */}
      {/* CONTACT */}

      {/* <div className="w-full h-screen flex items-center justify-center">
        {" "}
        <div className="border border-black rounded-xl w-[80%] h-[90%]">
          VIDEO FOR THE PROJECT SHOWCASE
        </div>
        
      </div> */}
      {/* <div className="w-full h-screen relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:linear-gradient(to bottom, transparent 0%, white 25%)] pointer-events-none" />
        <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:linear-gradient(to bottom, white 0%, transparent 25%)] pointer-events-none" />

        <div className="w-full h-full grid grid-cols-3 gap-2 p-2 skew-y-[10deg] grid-rows-2">
          <div className="bg-zinc-900 rounded-xl"></div>
          <div className="bg-zinc-900 rounded-xl"></div>
          <div className="bg-zinc-900 rounded-xl"></div>
          <div className="bg-zinc-900 rounded-xl"></div>
          <div className="bg-zinc-900 rounded-xl"></div>
          <div className="bg-zinc-900 rounded-xl"></div>
        </div>
      </div> */}

      <Footer />
    </>
  );
};

export default LandingPage;
