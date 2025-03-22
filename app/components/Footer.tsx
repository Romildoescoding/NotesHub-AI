import { AlignLeft, Bold, Pencil, TextCursor } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col text-zinc-50 h-screen min-h-fit bg-black rounded-t-3xl p-6 pt-12 pb-0">
      <div className="w-full h-full relative flex flex-col justify-center">
        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[15%] top-[5%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1.25]">
          {" "}
          <Bold size={48} />
        </div>
        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[50%] -translate-x-1/2 top-[5%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[2deg] scale-[1.25]">
          {" "}
          <Bold size={48} />
        </div>
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all right-[15%] top-[5%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-[18deg] scale-[1.25]">
          {" "}
          <Pencil size={48} />
        </div>

        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[40%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <AlignLeft size={48} />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-12">
          {" "}
          <AlignLeft size={48} />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all left-[30%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-[8deg]">
          {" "}
          <AlignLeft size={48} />
        </div>
        <div
          className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all right-[30%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[10deg]
        "
        >
          {" "}
          <AlignLeft size={48} />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-12">
          {" "}
          <AlignLeft size={48} />
        </div>

        <div className="p-4 blur-[3px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[40%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <TextCursor size={48} />
        </div>
        <div className="p-4 blur-[1px] scale-[1.1] opacity-1 hover:shadow-xl transition-all right-[5%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-[24deg]">
          {" "}
          <TextCursor size={48} />
        </div>
        <h1 className="text-8xl font-semibold text-center">NoteCraft AI</h1>
        <p className="text-center text-lg text-zinc-400 mt-2">
          Crafting Smarter Notes with AI Precision, One Craft at a Time.
        </p>
      </div>

      <div className="w-full h-fit flex justify-center gap-6 my-6">
        <a href="/privacy" className="hover:text-zinc-300">
          Privacy
        </a>
        <a href="/terms" className="hover:text-zinc-300">
          Terms
        </a>
        <a href="/contact" className="hover:text-zinc-300">
          Contact
        </a>
      </div>

      <div className="mt-auto flex justify-between items-center w-full border-t border-zinc-700 p-4">
        <p className="text-sm text-zinc-400">
          © {new Date().getFullYear()} NoteCraft AI
        </p>
        <a
          href="https://romildoescoding.vercel.app/"
          target="_blank"
          className="text-6xl humane font-light hover:text-zinc-300"
        >
          ROMILDOESCODING
        </a>
      </div>
    </div>
  );
};
export default Footer;
