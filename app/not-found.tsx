"use client";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-screen flex-col h-screen flex items-center justify-center">
      <p className="text-9xl min-[500px]:text-[156px] min-[1000px]:text-[20vw] font-semibold leading-9xl min-[500px]:leading-[156px] min-[1000px]:leading-[20vw]">
        404
      </p>
      <p className="flex flex-col text-center">
        <span className="text-sm min-[500px]:text-xl min-[1000px]:text-2xl">
          {"We can't find the page that you are looking for :("}
        </span>
        <span className="text-zinc-500 text-xs min-[500px]:text-md min-[1000px]:text-lg">
          {"Maybe you've got a broken link. Try to go back."}
        </span>
      </p>
      <p className="flex gap-2 mt-2">
        <button
          onClick={() => router.back()}
          className="rounded-full text-xl border border-gray-300 hover:bg-zinc-100 transition-all px-6 py-2 w-fit"
        >
          Go Back
        </button>
        <Link
          href="/dashboard"
          className="rounded-full text-xl bg-black hover:bg-zinc-800 transition-all text-white px-6 py-2 w-fit"
        >
          Dashboard
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
