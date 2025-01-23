import Form from "next/form";
import React from "react";

const NotesSearchForm = ({ query }: { query: string | any }) => {
  return (
    <Form
      action="/dashboard/list"
      scroll={false}
      className="flex flex-col h-fit w-full p-2 gap-2 border-2 rounded-xl items-center"
    >
      <input
        name="query"
        defaultValue={query ?? ""}
        className=" h-12 w-[25vw] p-2 px-4 border-2 focus:w-[50vw] bg-white outline-none hover:shadow-md transition-all rounded-full focus:shadow-md"
        style={{ transition: "width 0.35s ease-in-out" }}
        placeholder="Search via name, tags or categories"
      />
      <button
        type="submit"
        className="bg-zinc-900 text-zinc-50 p-2 px-6 w-fit rounded-full"
      >
        Search
      </button>
    </Form>
  );
};

export default NotesSearchForm;
