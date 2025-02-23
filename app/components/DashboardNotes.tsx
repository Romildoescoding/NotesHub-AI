"use client";
import React from "react";
import useFetchNotes from "../(root)/notes/useFetchNotes";
import { CircleAlert } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const DashboardNotes = () => {
  const { notes, isFetching } = useFetchNotes();
  return (
    <div className="rounded-lg max-h-fit border-[1px] flex flex-col gap-2 p-6 w-full max-w-sm">
      <CardTitle>Recent Notes</CardTitle>
      <CardDescription>
        The following are your latest exported notes
      </CardDescription>
      {notes.length > 0 ? (
        <>
          {notes.slice(0, 3).map((note, i) => (
            <div
              key={i}
              className="w-full p-2 hover:bg-zinc-100  transition border-[1px] rounded-lg text-sm font-semibold capitalize"
            >
              {note.title.length > 22
                ? note.title.slice(0, 22) + ".."
                : note.title}
            </div>
          ))}

          {/* <div className="w-full p-2 hover:bg-zinc-100 cursor-pointer transition border-[1px] rounded-lg text-sm font-semibold">
            Best Note
          </div>
          <div className="w-full p-2 hover:bg-zinc-100 cursor-pointer transition border-[1px] rounded-lg text-sm font-semibold">
            Best Note
          </div> */}
          <Link
            href="/notes"
            className="w-full flex items-center justify-center p-2 font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-lg transition-all"
          >
            Browse Notes
          </Link>
        </>
      ) : (
        <div className="w-full flex flex-col gap-2 text-center">
          <span className="font-semibold items-center gap-2 mt-4 flex flex-col">
            <CircleAlert />
            No notes found!
          </span>
          <span className=" text-sm text-zinc-600">
            You have not uploaded any notes yet.
          </span>
          <Link
            href="/notes/upload"
            className="w-full flex items-center justify-center p-2 font-semibold text-sm bg-zinc-950 hover:bg-zinc-800 text-zinc-50 rounded-lg transition-all"
          >
            Upload Notes
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardNotes;
