import Image from "next/image";
import React from "react";

// title: {
//       type: String,
//       required: true, // Ensure every note has a title
//     },
//     fileName: {
//       type: String,
//       required: true, // Store the name of the uploaded file
//     },
//     fileUrl: {
//       type: String,
//       required: true, // URL of the file on AWS S3
//     },
//     isPublic: {
//       type: Boolean,
//       default: false, // Whether the note is public or private
//     },
//     tags: {
//       type: [String],
//       default: ["notes", "pdfs"], // Default tags for AI-generated or user-added tags
//     },
//     uploadedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Reference to the User model
//       required: true,
//     },
//     uploaderEmail: {
//       type: String,
//       required: true, // Store the uploader's email for redundancy and quick lookup
//     },
//     description: {
//       type: String,
//       default: "", // Optional description or summary of the note
//     },
const Note = ({ note }) => {
  return (
    <div className=" h-fit w-56 p-4 border-2 flex flex-col">
      <iframe src={note.fileUrl} width="224" height="112" title="PDF Preview" />
      <p>{note.fileName}</p>
      <p>{note.uploaderEmail}</p>
    </div>
  );
};

export default Note;
