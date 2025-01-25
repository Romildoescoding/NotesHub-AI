import { getUser } from "@/app/_data/user";
import { fetchUserChats } from "@/app/_lib/actions";
import AiChatPage from "@/app/components/AiChatPage";
import ChatArea from "@/app/components/ChatArea";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import React from "react";

const AIChat = async () => {
  const { email } = await getUser();
  const chats = await fetchUserChats(email);
  console.log("------------------------------");
  console.log(chats);
  console.log("------------------------------");

  return (
    <SessionProvider>
      {/* <div className="w-full h-fit fixed top-[100vh] left-1/2 -translate-x-1/2 max-w-[60vw]">
        <input
          type="text"
          className="w-full p-2 px-4 rounded-lg"
          placeholder="What this pdf is about?"
        />
      </div> */}
      <AiChatPage chats={chats} />
    </SessionProvider>
  );
};

export default AIChat;
