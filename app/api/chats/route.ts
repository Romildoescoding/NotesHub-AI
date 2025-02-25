import { NextResponse } from "next/server";
import dbConnect from "@/app/_lib/dbConnect";
import Chat from "@/app/models/ChatsModel";
import { NextApiRequest } from "next";
import {
  addChatForUser,
  serializeData,
  deleteChat,
  renameChat,
} from "@/app/_lib/actions";

// Function to fetch messages
const fetchMessages = async (chatId: string) => {
  await dbConnect();
  const messages = await Chat.find({ chatId }).sort({ createdAt: 1 }).lean();
  return messages;
};

// Function to add a message
const addMessage = async (
  chatId: string,
  sender: "user" | "ai",
  content: string,
  document: string | undefined
) => {
  await dbConnect();

  const message = document
    ? new Chat({ chatId, sender, content, document })
    : new Chat({ chatId, sender, content });
  await message.save();
  return message;
};

// Handle GET requests
export async function GET(req: NextApiRequest) {
  try {
    await dbConnect();

    // Extract chatId from the query parameters
    const { searchParams } = new URL(req.url); // Extract search parameters
    const chatId = searchParams.get("chatId"); // Retrieve the 'chatId' query params
    console.log(chatId);

    if (!chatId) {
      return NextResponse.json(
        { status: "error", message: "Missing 'chatId' parameter" },
        { status: 400 }
      );
    }

    const messages = await fetchMessages(chatId);
    console.log(messages);
    return NextResponse.json({ status: "success", data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    console.log(body);
    const { chatId, sender, content } = body;

    if (!chatId || !sender) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!body?.document && !content) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    const addedMessage = await addMessage(
      chatId,
      sender,
      content,
      body?.document
    );
    console.log("Added message is--------------------------------------");
    console.log(addedMessage);
    console.log("------------------------------------------------------");
    return NextResponse.json({ status: "success", data: addedMessage });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to add message" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;
    const newUserChats = await addChatForUser(email);
    return NextResponse.json({
      status: "success",
      data: serializeData(newUserChats),
    });
  } catch (error) {
    console.error("Error creating new chat:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to create note" },
      { status: 500 }
    );
  }
}

//Renaming the chats using chatId
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();

    const { email, chatId, newName } = body;

    if (!chatId || !newName) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    const renamedChat = await renameChat(email, chatId, newName);
    console.log("Renamed chat is--------------------------------------");
    console.log(renamedChat);
    console.log("------------------------------------------------------");
    return NextResponse.json({ status: "success", data: renamedChat });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to add message" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();

    const { chatId, email } = body;

    if (!chatId) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing chatId in the body of the request",
        },
        { status: 400 }
      );
    }

    const deletedChat = await deleteChat(email, chatId);
    console.log("Deleted chat is--------------------------------------");
    console.log(deletedChat);
    console.log("------------------------------------------------------");
    return NextResponse.json({ status: "success", data: deletedChat });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to delete chat" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests
export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    },
  });
}
