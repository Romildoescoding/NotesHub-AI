import Note from "@/app/components/Note";
import NotesSearchForm from "@/app/components/NotesSearchForm";
import Notes from "@/app/models/NotesModel";
import Form from "next/form";
import React from "react";

const MyNotes = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const filter = query
    ? { $or: [{ title: { $regex: query, $options: "i" } }, { tags: query }] }
    : {};

  // Fetch notes based on the filter
  const data = JSON.parse(JSON.stringify(await Notes.find(filter)));
  console.log(data);

  //If the query is null, then all results should be there..
  //Else if query exists, then the notes results are to befileterd based off of name of file, tags or categories

  return (
    <div className="w-full items-center flex flex-col h-fit py-4 mt-40">
      <NotesSearchForm query={query} />
      {data.map((note, i) => {
        // Convert the Mongoose document to a plain object
        return <Note key={i} note={note} />;
      })}
    </div>
  );
};

export default MyNotes;
