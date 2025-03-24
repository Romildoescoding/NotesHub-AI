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
      <div className="w-full max-h-[800px] h-[80vh] min-[600px]:h-screen flex relative flex-col justify-center gap-2 items-center">
        {/* <div className="w-[90vw] ml-[5vw] mr-[5vw] bg-zinc-300 h-[2px] absolute left-0 bottom-0"></div> */}
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[10%] top-[10%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[18deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <Send className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[50%] -translate-x-1/2 top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[2deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <Sparkles className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all right-[10%] top-[10%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <Pencil className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[10%] top-[75%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[8deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <MessageCircleMore className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div
          className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all right-[10%] top-[75%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[10deg] scale-[1] min-[600px]:scale-[1.25]
        "
        >
          {" "}
          <WandSparkles className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all -translate-x-1/2 left-[50%] top-[80%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[6deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <ScanLine className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="text-sm min-[500px]:text-base cursor-default border-t-2 rounded-full"
          >
            The Solution
          </RainbowButton>
        </div>

        <h1 className="text-center text-[8vw] leading-[8vw] px-2 min-[600px]:px-0 min-[600px]:text-[5vw] min-[600px]:leading-[6vw] text-zinc-900  font-medium tracking-tighter">
          <span>NoteCraft AI is an all-in-one</span>{" "}
          <span>notes management application.</span>
        </h1>
        <span className="text-base px-4 min-[600px]:px-0 min-[600px]:text-xl text-zinc-600 text-center">
          Take a look at what NoteCraft AI offers you as a service
        </span>
      </div>

      {/* OCR Scanner */}
      <div className="w-full h-fit pt-[25vh] pb-[5vh] flex relative flex-col justify-center gap-2 items-center">
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[24deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <ScanLine className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all right-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <ScanSearch className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[30%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <ScanSearch className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[1px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[25%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <ScanLine className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="text-sm min-[500px]:text-base cursor-default border-t-2 rounded-full"
          >
            OCR Scanner
          </RainbowButton>
        </div>

        <h1 className="text-center px-[10vw]  text-[8vw] leading-[7vw] min-[600px]:text-[5vw] min-[600px]:leading-[6vw] text-zinc-900  font-medium tracking-tighter">
          <span>Scan your notes and get</span>{" "}
          <span>the results in the editor</span>
        </h1>

        <div className="mt-12 mx-[2.5vw] min-[500px]:mx-[10vw] w-[95vw] min-[500px]:w-[80vw] aspect-video rounded-xl bg-black"></div>
      </div>

      {/* Editor Interface */}
      <div className="w-full h-fit pt-[25vh] pb-[5vh] flex relative flex-col justify-center gap-2 items-center">
        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <Bold className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all right-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[18deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <Pencil className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[30%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <AlignLeft className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[3px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[25%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <TextCursor className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="text-sm min-[500px]:text-base cursor-default border-t-2 rounded-full"
          >
            Editor Interface
          </RainbowButton>
        </div>

        <h1 className="text-center px-[5vw] text-[8vw] leading-[7vw] min-[600px]:text-[5vw] min-[600px]:leading-[6vw] text-zinc-900  font-medium tracking-tighter">
          Refine your scanned notes using a Markdown-based editor.
        </h1>

        <div className="mt-12 mx-[2.5vw] min-[500px]:mx-[10vw] w-[95vw] min-[500px]:w-[80vw] aspect-video rounded-xl bg-black"></div>
      </div>

      {/* Chat with AI */}
      <div className="w-full h-fit pt-[25vh] pb-[5vh] flex relative flex-col justify-center gap-2 items-center">
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-[24deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <Sparkles className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all right-[15%] top-[5%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1] min-[600px]:scale-[1.25]">
          {" "}
          <Send className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[30%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <MessageCircleMore className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="p-4 blur-[1px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[25%] border absolute z-[21] bg-white shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <WandSparkles className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="dark w-fit h-fit border-t-[2px] border-l-[2px] border-r-[2px] border-gray-100 rounded-full">
          <RainbowButton
            disabled={true}
            className="text-sm min-[500px]:text-base cursor-default border-t-2 rounded-full"
          >
            AI Chat
          </RainbowButton>
        </div>

        <h1 className="text-center px-[5vw] text-[8vw] gap-2 leading-[7vw] min-[600px]:text-[5vw] min-[600px]:leading-[6vw] text-zinc-900  font-medium tracking-tighter">
          Turn your notes into a conversation with intelligent AI assistance.
        </h1>

        <div className="mt-12 mx-[2.5vw] min-[500px]:mx-[10vw] w-[95vw] min-[500px]:w-[80vw] aspect-video rounded-xl bg-black"></div>
      </div>

      {/* CALL-TO-ACTION */}
      <div className="cta-section w-full h-fit pt-[10vh] pb-[10vh] min-[600px]:pb-[5vh] min-[600px]:pt-0 min-[600px]:h-screen overflow-hidden px-[10vw]  flex relative flex-col justify-center gap-4 items-center">
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
        <h1 className="text-center px-[5vw] min-[600px]:px-[10vw] text-[8vw] leading-[7vw] min-[600px]:text-[5vw] min-[600px]:leading-[6vw] text-zinc-900  font-medium tracking-tighter">
          Ready to transform the way you manage notes?
        </h1>
        <span className="text-center px-[10vw] min-[600px]:px-[20vw] text-[16px] leading-[16px] min-[600px]:text-xl mt-4 min-[600px]:mt-2 flex flex-col gap-4 text-zinc-400">
          Unlock AI-powered efficiency to structure, retrieve, and engage with
          your notes like never before.
        </span>
        <Link href="/dashboard" className="cta-btn">
          <RainbowButton className="ml-2 py-6 px-8 min-[500px]:py-8 min-[500px]:px-12 text-lg min-[600px]:text-2xl rounded-full">
            Get Started
          </RainbowButton>
        </Link>
      </div>

      {/* <BentorGrid /> */}
      {/* <MarqueeDemo /> */}

      <Footer />
    </>
  );
};

export default LandingPage;
