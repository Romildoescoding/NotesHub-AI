import {
  AlignLeft,
  Bold,
  MessageCircleMore,
  Pencil,
  ScanLine,
  Send,
  Sparkles,
  TextCursor,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex flex-col text-zinc-50 h-[70vh] min-[600px]:h-screen min-h-fit bg-black rounded-t-3xl p-6 pt-12 pb-0">
      <div className="w-full h-full relative flex flex-col justify-center">
        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[5%] min-[600px]:left-[15%] top-[20%] min-[600px]:top-[5%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[18deg] scale-[1.25]">
          {" "}
          <Bold className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all left-[50%] -translate-x-1/2 top-[5%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[2deg] scale-[1.25]">
          {" "}
          <Sparkles className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all right-[5%] min-[600px]:right-[15%] top-[20%] min-[600px]:top-[5%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-[18deg] scale-[1.25]">
          {" "}
          <Pencil className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="max-[600px]:hidden p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[40%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-12">
          {" "}
          <Send className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[3px] opacity-1 hover:shadow-xl transition-all left-[5%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-12">
          {" "}
          <AlignLeft className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[1px] opacity-1 hover:shadow-xl transition-all left-[50%] max-[599px]:-translate-x-1/2 min-[600px]:left-[30%] top-[65%] min-[600px]:top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-[8deg]">
          {" "}
          <MessageCircleMore className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div
          className="max-[600px]:hidden p-4 blur-[2px] opacity-1 hover:shadow-xl transition-all right-[30%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[10deg]
        "
        >
          {" "}
          <WandSparkles className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>

        <div className="max-[600px]:hidden p-4 blur-[3px] scale-[1.25] opacity-1 hover:shadow-xl transition-all right-[5%] top-[40%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg rotate-[24deg]">
          {" "}
          <ScanLine className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <div className="p-4 blur-[1px] scale-[1.25] opacity-1 hover:shadow-xl transition-all right-[5%] top-[75%] border absolute z-[21] bg-black shadow-md border-gray-300 rounded-lg -rotate-[24deg]">
          {" "}
          <TextCursor className="w-8 h-8 min-[800px]:w-12 min-[800px]:h-12" />
        </div>
        <h1 className="text-center px-[5vw] text-[10vw] gap-2 leading-[7vw] min-[600px]:text-[5vw] min-[600px]:leading-[6vw] text-white  font-medium tracking-tighter">
          NoteCraft AI
        </h1>
        <p className="text-center text-lg text-zinc-400 mt-2">
          Crafting Smarter Notes with AI Precision, One Craft at a Time.
        </p>
      </div>

      <div className="w-full h-fit flex justify-center text-base min-[400px]:text-lg gap-8 my-6">
        <Link href="/privacy" className="transition-all hover:text-zinc-300">
          Privacy Policy
        </Link>
        <Link href="/terms" className="transition-all hover:text-zinc-300">
          Terms and Conditions
        </Link>
        {/* <a href="/contact" className="hover:text-zinc-300">
          Contact
        </a> */}
      </div>

      <div className="mt-auto flex justify-between items-center w-full border-t border-zinc-700 p-4">
        <p className=" text-zinc-300 text-sm min-[600px]:text-xl">
          © {new Date().getFullYear()} NoteCraft AI
        </p>
        <a
          href="https://romildoescoding.vercel.app/"
          target="_blank"
          className="text-6xl humane font-light transition-all hover:text-zinc-300"
        >
          ROMILDOESCODING
        </a>
      </div>
    </div>
  );
};
export default Footer;
