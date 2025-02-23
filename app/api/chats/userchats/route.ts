import { fetchUserChats } from "@/app/_lib/actions";
import dbConnect from "@/app/_lib/dbConnect";
import { verifySession } from "@/app/_lib/session";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    console.log(req.cookies);
    const decoded = await verifySession();
    const user = decoded.user;
    const messages = await fetchUserChats(user?.email);
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
