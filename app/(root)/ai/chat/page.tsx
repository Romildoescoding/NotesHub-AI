// "use client";
import { getUser } from "@/app/_data/user";
import { fetchUserChats } from "@/app/_lib/actions";
import AiChatPage from "@/app/components/AiChatPage";
// import ChatArea from "@/app/components/ChatArea";
import { SessionProvider } from "next-auth/react";
// import Image from "next/image";
import React from "react";
// import useUserChats from "./useUserChats";
// import { useCurrentEditor } from "@tiptap/react";
// import { useCurrentUser } from "@/app/auth/useCurrentUser";

const AIChat = async () => {
  const { email } = await getUser();
  const chats = await fetchUserChats(email);
  // const { user } = useCurrentUser();
  // const { chats } = useUserChats();

  return (
    <SessionProvider>
      <AiChatPage chats={chats} email={email} />
    </SessionProvider>
  );
};

export default AIChat;

// export const revalidate = 0;
