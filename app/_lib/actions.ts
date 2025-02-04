import Chat from "../models/ChatsModel";
import UserChats from "../models/UserChatsModel";
import dbConnect from "./dbConnect";

export const getUserClient = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const user = await response.json();
    console.log(user);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch user");
    // }

    // const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

import { v4 as uuidv4 } from "uuid";

export function serializeData(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      key === "_id" ? value.toString() : value
    )
  );
}

export async function addChatForUser(email: string) {
  const chatId = uuidv4();

  // Find the UserChats document for the user
  let userChats = await UserChats.findOne({ email });

  if (!userChats) {
    // If the document doesn't exist, create a new one
    userChats = new UserChats({
      email,
      chats: [{ chatId, title: "New Chat" }], // Initialize with the new chatId
    });
    await userChats.save();
  } else {
    // If the document exists, push the new chatId
    userChats.chats.push({ chatId, title: "New Chat" });
    await userChats.save();
  }

  //Initialize a message from AI in that chat already...
  const message = new Chat({
    chatId,
    sender: "ai",
    content:
      "Hey There! Feel free to ask me anything or even select a PDF file and ask any questions about it. I'm here to help! 😊",
  });
  await message.save();

  return userChats;
}

export async function fetchUserChats(email: string) {
  try {
    await dbConnect();

    // Find the UserChats document and convert it to a plain object
    const userChats = await UserChats.findOne({ email }).lean();

    if (!userChats) {
      // If no chats exist, initialize with a new chat
      const newUserChats = await addChatForUser(email);
      return serializeData(newUserChats);
    }

    return serializeData(userChats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return {
      success: false,
      message: "An error occurred while fetching chats.",
    };
  }
}

export async function renameChat(email, chatId, newName) {
  try {
    // Find the user by email and update the chat's title where chatId matches
    const updatedChat = await UserChats.findOneAndUpdate(
      { email, "chats.chatId": chatId }, // Match the document containing the email and specific chatId
      { $set: { "chats.$.title": newName } }, // Use the $ operator to update the matched chat's title
      { new: true } // Return the updated document
    );

    if (!updatedChat) {
      return {
        success: false,
        message: "Chat not found or email does not exist.",
      };
    }

    return {
      success: true,
      message: "Chat renamed successfully.",
      updatedChat,
    };
  } catch (err) {
    console.error("Error renaming chat:", err);
    return {
      success: false,
      message: "An error occurred while renaming the chat.",
    };
  }
}

export async function deleteChat(email, chatId) {
  try {
    // Find the user's chat object
    const userChat = await UserChats.findOne({ email });
    if (!userChat) {
      return { success: false, message: "User not found." };
    }

    // Remove the chat with the given chatId
    const updatedChatsArr = userChat.chats.filter(
      (chat) => chat.chatId !== chatId
    );

    // Update the user's chat document
    const updatedChats = await UserChats.findOneAndUpdate(
      { email },
      { $set: { chats: updatedChatsArr } },
      { new: true } // Ensures the updated document is returned
    );

    return {
      success: true,
      message: "Chat deleted successfully.",
      updatedChats,
    };
  } catch (err) {
    console.error("Error deleting chat:", err);
    return {
      success: false,
      message: "An error occurred while deleting the chat.",
    };
  }
}
