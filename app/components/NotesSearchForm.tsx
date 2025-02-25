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

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useSearchNotes } from "../context/SearchNotesContext";
import { motion } from "framer-motion";

const NotesSearchForm = () => {
  const { query, setQuery, category, setCategory, visibility, setVisibility } =
    useSearchNotes();

  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div className="flex flex-col gap-4 min-[1050px]:gap-0 min-[1050px]:flex-row justify-between w-full bg-white pr-4">
      <div
        className={`flex w-fit items-center  px-2 rounded-lg border-[1px] ${
          inputFocused ? "border-zinc-800" : " border-zinc-300"
        }`}
      >
        <button className="bg-white cursor-default text-zinc-500 pl-[4px] pr-[8px] transition-all">
          {/* Search */}
          <Search size={18} />
        </button>
        <input
          name="query"
          onBlur={() => setInputFocused(false)}
          onFocus={() => setInputFocused(true)}
          // defaultValue={query}
          value={query}
          className="w-full min-[1050px]:w-96 h-10 pr-4 border-none rounded-md text-zinc-700 duration-300 outline-none transition-all"
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
      <div className=" w-full justify-end flex-col min-[600px]:flex-col min-[965px]:flex-row min-[1050px]:w-fit min-[1050px]:justify-start flex gap-2">
        <div className="flex gap-1 border-[1px] items-center px-[6px] rounded-full shadow-sm">
          <button
            onClick={(e) => {
              e.preventDefault();
              setVisibility("");
            }}
            disabled={visibility === ""}
            className={`${
              visibility === ""
                ? "bg-zinc-950 text-zinc-50 cursor-not-allowed"
                : "bg-white text-zinc-600 cursor-pointer"
            } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-full px-4 border-none shadow-sm h-fit w-fit`}
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
                : "bg-white text-zinc-600 cursor-pointer"
            } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-full px-4 border-none shadow-sm h-fit w-fit`}
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
                : "bg-white text-zinc-600 cursor-pointer"
            } py-1 hover:bg-zinc-950 hover:text-zinc-50 transition-all rounded-full px-4 border-none shadow-sm h-fit w-fit`}
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
