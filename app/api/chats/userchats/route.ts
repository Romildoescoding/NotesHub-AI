import { fetchUserChats } from "@/app/_lib/actions";
import dbConnect from "@/app/_lib/dbConnect";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    console.log(req.cookies);
    const messages = await fetchUserChats("romilrajrana1@gmail.com");
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
