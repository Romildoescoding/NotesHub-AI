import React from "react";
import { BackgroundBoxesDemo } from "@/components/ui/Hero";
import { ScanLine } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      <BackgroundBoxesDemo />
      <div className="w-full h-screen bg-white flex flex-col gap-4 items-center justify-center">
        <h1 className="text-7xl font-semibold">How it works</h1>
        <p className="text-2xl">
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
        </div>
      </div>
      <div className="w-full h-screen flex items-center justify-center">
        {" "}
        <div className="border border-black rounded-xl w-[80%] h-[90%]">
          VIDEO FOR THE PROJECT SHOWCASE
        </div>
        {/* TESTIMONIALS */}
        {/* DETAILS */}
        {/* GET STARTED */}
        {/* CONTACT */}
      </div>
    </>
  );
};

export default LandingPage;
