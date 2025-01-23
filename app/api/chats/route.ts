import { NextResponse } from "next/server";
import dbConnect from "@/app/_lib/dbConnect";
import Chat from "@/app/models/ChatsModel";
import { NextApiRequest } from "next";

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
  content: string
) => {
  await dbConnect();
  const message = new Chat({ chatId, sender, content });
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

    const { chatId, sender, content } = body;

    if (!chatId || !sender || !content) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    const addedMessage = await addMessage(chatId, sender, content);
    return NextResponse.json({ status: "success", data: addedMessage });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to add message" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests
export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "GET, POST, OPTIONS",
    },
  });
}
