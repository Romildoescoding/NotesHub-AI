import mongoose, { Document, model, models, Schema } from "mongoose";

// Define the interface for the Notes model
export interface INote extends Document {
  title: string; // Title of the note
  fileName: string; // Name of the uploaded file
  fileUrl: string; // URL of the file stored in AWS S3
  isPublic: boolean; // Whether the note is public or private
  tags: string[]; // Tags for the note
  uploadedBy: mongoose.Types.ObjectId; // Reference to the uploader's User ID
  uploaderEmail: string; // Email of the uploader
  description?: string; // Optional description for the note
  createdAt: Date; // Timestamp when the note was created
  updatedAt: Date; // Timestamp when the note was last updated
}

// Define the Notes schema
const notesSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true, // Ensure every note has a title
    },
    fileName: {
      type: String,
      required: true, // Store the name of the uploaded file
    },
    fileUrl: {
      type: String,
      required: true, // URL of the file on AWS S3
    },
    isPublic: {
      type: Boolean,
      default: false, // Whether the note is public or private
    },
    tags: {
      type: [String],
      default: ["notes", "pdfs"], // Default tags for AI-generated or user-added tags
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    uploaderEmail: {
      type: String,
      required: true, // Store the uploader's email for redundancy and quick lookup
    },
    description: {
      type: String,
      default: "", // Optional description or summary of the note
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Export the model
const Notes = models.Notes || model<INote>("Notes", notesSchema);

export default Notes;
