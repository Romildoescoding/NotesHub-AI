import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the UserChats document
interface IUserChats extends Document {
  email: string; // Reference to the User schema
  chats: []; // Array of chat IDs associated with the user
  createdAt: Date; // Timestamp for record creation
}

// Define the schema for the UserChats collection
const userChatsSchema = new Schema<IUserChats>({
  email: {
    type: String,
    ref: "User", // Reference to the User model
    required: true,
    unique: true, // Ensure one record per user
  },
  chats: {
    type: [], // Array of chat IDs
    required: true,
    default: [], // Initialize with an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the timestamp
  },
});

// Create the model using the schema and interface
const UserChats =
  mongoose.models?.UserChats ||
  mongoose.model<IUserChats>("UserChats", userChatsSchema);

export default UserChats;
