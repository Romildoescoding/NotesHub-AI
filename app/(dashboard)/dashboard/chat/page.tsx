import { getUser } from "@/app/_data/user";
import ChatArea from "@/app/components/ChatArea";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import React from "react";

const AIChat = async () => {
  return (
    <SessionProvider>
      <ChatArea chatId="123" />
      {/* <div className="w-full h-fit fixed top-[100vh] left-1/2 -translate-x-1/2 max-w-[60vw]">
        <input
          type="text"
          className="w-full p-2 px-4 rounded-lg"
          placeholder="What this pdf is about?"
        />
      </div> */}
    </SessionProvider>
  );
};

export default AIChat;
