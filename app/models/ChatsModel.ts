import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Chat document
interface IChat extends Document {
  chatId: string; // Group ID for a chat session
  sender: "user" | "ai"; // Message sender type
  document: string;
  content: string; // Message content
  createdAt: Date; // Message timestamp
}

// Define the schema for the chats collection
const chatSchema = new Schema<IChat>({
  chatId: {
    type: String,
    required: true, // Unique identifier for the chat session
    index: true, // Add an index for faster query performance
  },
  sender: {
    type: String,
    required: true,
    enum: ["user", "ai"], // Restrict values to 'user' or 'ai'
  },
  document: {
    type: String,
    required: false,
    default: "",
  },
  content: {
    type: String,
    required: function () {
      return !this.document; // If document is empty, content is required
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the timestamp
  },
});

// Create the model using the schema and interface
const Chat = mongoose.models?.Chat || mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
