import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  provider: "google" | "github" | "custom";
  image: string;
  password?: string;
  providerId: string;
  professionalTitle: string;
  profession: string;
  createdAt: Date;
}

// Define the user schema with proper type annotations
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    default: "https://placehold.co/48",
  },
  provider: {
    type: String,
    required: true,
    enum: ["google", "github", "custom"], // OAuth providers + custom
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "custom"; // Only required for custom auth
    },
  },
  providerId: {
    type: String,
    required: true,
    unique: true, // Unique ID (e.g., email) for OAuth users
  },
  professionalTitle: {
    type: String,
    required: false,
    default: "",
  },
  profession: {
    type: String,
    required: false,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model using the schema and interface
const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
