// import Form from "next/form";
// import React from "react";

// const NotesSearchForm = ({ query }: { query: string | any }) => {
//   return (
//     <Form
//       action="/dashboard/list"
//       scroll={false}
//       className="flex flex-col h-fit w-full p-2 gap-2 border-2 rounded-xl items-center"
//     >
//       <input
//         name="query"
//         defaultValue={query ?? ""}
//         className=" h-12 w-[25vw] p-2 px-4 border-2 focus:w-[50vw] bg-white outline-none hover:shadow-md transition-all rounded-full focus:shadow-md"
//         style={{ transition: "width 0.35s ease-in-out" }}
//         placeholder="Search via name, tags or categories"
//       />
//       <button
//         type="submit"
//         className="bg-zinc-900 text-zinc-50 p-2 px-6 w-fit rounded-full"
//       >
//         Search
//       </button>
//     </Form>
//   );
// };

// export default NotesSearchForm;

"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useSearchNotes } from "../context/SearchNotesContext";
import { motion } from "framer-motion";

const NotesSearchForm = () => {
  const { query, setQuery, category, setCategory, visibility, setVisibility } =
    useSearchNotes();

  return (
    <div className="flex justify-between w-full bg-white pr-4">
      <div className="flex w-fit items-center border-2 px-2 rounded-md border-zinc-200">
        <button className="bg-white cursor-default text-zinc-300 border-r-2 px-[12px] transition-all">
          {/* Search */}
          <Search />
        </button>
        <input
          name="query"
          // defaultValue={query}
          value={query}
          className=" w-96 h-10 px-4 border-none rounded-md duration-300 outline-none transition-all"
          placeholder="Search notes.."
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.length > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 p-1 h-fit w-fit text-sm rounded-md text-zinc-400 bg-zinc-100 hover:text-zinc-600 transition-all"
            onClick={(e) => {
              e.preventDefault();
              setQuery("");
            }}
          >
            <X size={16} />
          </motion.button>
        )}
      </div>

      {/* Filters and other */}
      <div className="w-fit flex gap-2">
        <div className="flex gap-1 border-2 items-center px-1 rounded-md shadow-sm border-zinc-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              setVisibility("");
            }}
            disabled={visibility === ""}
            className={`${
              visibility === ""
                ? "bg-zinc-950 text-zinc-50 cursor-not-allowed"
                : "bg-white txt-zinc-950 cursor-pointer"
            } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-md px-3 border-none shadow-sm h-fit w-fit`}
          >
            All
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setVisibility("public");
            }}
            disabled={visibility === "public"}
            className={`${
              visibility === "public"
                ? "bg-zinc-950 text-zinc-50 cursor-not-allowed"
                : "bg-white txt-zinc-950 cursor-pointer"
            } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-md px-3 border-none shadow-sm h-fit w-fit`}
          >
            Public
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setVisibility("private");
            }}
            disabled={visibility === "private"}
            className={`${
              visibility === "private"
                ? "bg-zinc-950 text-zinc-50 cursor-not-allowed"
                : "bg-white txt-zinc-950 cursor-pointer"
            } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-md px-3 border-none shadow-sm h-fit w-fit`}
          >
            Private
          </button>
        </div>

        <div className="relative flex w-36 items-center">
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 w-full border-zinc-100 border-2  bg-white  rounded-md px-3 outline-none cursor-pointer transition-all focus:border-zinc-300 text-zinc-600"
          >
            {["All", "Typescript", "Javascript", "Learning", "Testing"].map(
              (val) => (
                <option
                  key={val}
                  value={val === "All" ? "" : val}
                  className="option bg-white text-black px-3 py-2 hover:bg-zinc-200"
                >
                  {val}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NotesSearchForm;
