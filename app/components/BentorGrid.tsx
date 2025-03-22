import Image from "next/image";
import React from "react";

const BentorGrid = () => {
  return (
    <div className="w-full h-screen py-[2vw] px-[5vw] gap-4 grid grid-rows-3 grid-cols-2">
      {/* BENTO-GRID-1 */}
      <div className="rounded-lg flex flex-col justify-center overflow-hidden hover:overflow-visible transition-all bento-grid-1 h-auto border-[2px] border-gray-300 col-span-2 relative px-8 p-4 shadow-md">
        <p className="text-5xl font-bold">AI Chat</p>

        <p className="text-base text-zinc-500 mt-2">
          Instantly get answers to any questions about your notes,
        </p>
        <p className="text-base text-zinc-500">
          {" "}
          engaging seamlessly as if you are conversing with the document itself.
        </p>

        {/* --------------Absolute-Hovered-chats--------------- */}
        <div className="shadow-md bento-chat-1 absolute right-[15%] scale-[1.05] bg-zinc-50 -rotate-[15deg] flex flex-col gap-2 items-start justify-center text-base top-[40%] -translate-y-1/2 p-4 py-8 rounded-lg transition-all border border-gray-300">
          <span>Provide a summary of the notes in 500 words.</span>
          <span>The summary should be well-structured.</span>
        </div>

        <div className="shadow-md bento-chat-2 absolute right-[10%] scale-[1.1] bg-zinc-50 -rotate-[25deg] flex flex-col gap-2 items-start justify-center text-base top-1/2 -translate-y-1/2 p-4 py-8 rounded-lg transition-all border border-gray-300 z-[3]">
          <span>Rewrite this passage in a more</span>
          {/* <span>and remember to include bullet points.</span> */}
          <span> formal tone with bullet points.</span>
        </div>

        <div className="shadow-md bento-chat-3 absolute right-[0%] scale-[1.05] bg-zinc-50 -rotate-[45deg] flex flex-col gap-2 items-start justify-center top-2/3 text-base -translate-y-1/2 p-4 py-8 rounded-lg transition-all border border-gray-300 z-[4]">
          <span>Find the main argument in this notes.</span>
          <span>Give a brief explanation for your analysis.</span>
        </div>
        {/* --------------Absolute-Hovered-chats--------------- */}
      </div>

      {/* BENTO-GRID-2 */}
      <div className="bento-grid-2 flex overflow-hidden flex-col relative rounded-lg border-[2px] border-gray-300 p-4 px-8">
        <p className="text-5xl font-bold">Note Editor</p>
        <p className="text-zinc-500 text-base mt-2">
          A feature-rich note editor, similar to Notion, with
        </p>
        <p className="text-zinc-500 text-base">
          effortless editing and seamless PDF saving.
        </p>

        <div className="bento-editor absolute z-[2] bg-white flex flex-col gap-[5%] h-[125%] w-auto border-2 border-gray-300 -bottom-[25%] -right-[45%] rotate-[-30deg]">
          <Image
            src="/editor.png"
            height={600}
            width={600}
            alt="editor"
            className="h-full w-auto"
          />
        </div>
      </div>

      {/* BENTO-GRID-3 */}
      <div className="bento-grid-3 overflow-hidden rounded-lg relative border-[2px] flex flex-col items-start p-6 px-8 border-gray-300 row-span-2">
        <p className="text-5xl font-bold">Intuitive Dashboard</p>
        <p className="text-base text-zinc-500 mt-2">
          Track total notes, trends, and key insights with intuitive graphs and
        </p>
        <p className="text-base text-zinc-500">
          view recent chats, notes, and top categories in one place.
        </p>

        <div className="bento-dashboard absolute bottom-[-15%] transition-all left-1/2 -translate-x-1/2 border-[8px] overflow-hidden border-b-0 bg-zinc-800 border-zinc-800 rounded-t-xl w-3/4 h-2/3">
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-zinc-900 rounded-b-sm w-10 h-2"></div>
          </div>
          <Image
            src="/hero-image-1.png"
            className="w-full h-auto rounded-t-md"
            height={1200}
            width={2400}
            alt="dashboard"
          />
        </div>
      </div>

      {/* BENTO-GRID-4 */}
      <div className="bento-grid-4 overflow-hidden flex flex-col relative rounded-lg border-[2px] border-gray-300 p-4 px-8">
        <p className="text-5xl font-bold">OCR Scanner</p>
        <p className="text-zinc-500 text-base mt-2">
          Upload your handwritten notes and convert them into editable text,
        </p>
        <p className="text-zinc-500 text-base">
          allowing you to refine, edit, and export with ease.
        </p>

        <div className="bento-notes-1 z-[3] absolute aspect-[2/3] bg-zinc-50 flex flex-col p-4 gap-[5%] h-auto w-1/4 border-2 border-gray-300 -bottom-[75%] right-8 rotate-12">
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
        </div>

        <div className="bento-notes-2 z-[2] absolute aspect-[2/3] bg-zinc-50 flex flex-col p-4 gap-[5%] h-auto w-1/4 border-2 border-gray-300 -bottom-[75%] right-8 rotate-12">
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
        </div>

        <div className="bento-notes-3 z-[1] absolute aspect-[2/3] bg-zinc-50 flex flex-col p-4 gap-[5%] h-auto w-1/4 border-2 border-gray-300 -bottom-[75%] right-8 rotate-12">
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
          <p className="w-full h-[1.5%] rounded-full bg-zinc-300"></p>
        </div>
      </div>
    </div>
  );
};

export default BentorGrid;
