"use client";
import React, { useEffect, useState } from "react";
import ChatArea from "./ChatArea";
import { Ellipsis, EllipsisVertical, Menu, SquarePen } from "lucide-react";
import UserChatButton from "./UserChatButton";
import useNewChat from "../(dashboard)/dashboard/chat/useNewChat";

const AiChatPage = ({ email, chats }) => {
  //  Create a selectedChat state and a hook that fetches all the messages/chats regarding that specific userChat
  const [selectedChat, setSelectedChat] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { createNewChat, isCreating, error } = useNewChat();

  //Simulate realtime update on new chats
  const [chatsState, setChatsState] = useState(chats.chats);

  useEffect(() => {
    console.log(chatsState);
  }, [chatsState]);

  // Use useEffect to access localStorage only in the browser
  useEffect(() => {
    const recentChatId =
      localStorage.getItem("recentChatId") || chatsState[0]?.chatId || "";
    setSelectedChat(recentChatId);
  }, [chatsState]);

  useEffect(() => {
    if (selectedChat) {
      localStorage.setItem("recentChatId", selectedChat);
    }
  }, [selectedChat]);

  async function handleCreateNewChat() {
    const newChat = await createNewChat(email);
    console.log("------------------------------------------------");
    // console.log(newChat);
    //Simulate realtime state update ><
    // setChatsState(newChat.data);
    setChatsState(newChat.data.chats);
    console.log("------------------------------------------------");
  }

  return (
    <div className="h-full w-full flex relative">
      {/* button to toggle sidebar */}
      <button
        className="fixed top-20 left-[12px] z-[99999999]"
        onClick={() => setIsSidebarOpen((open) => !open)}
      >
        <Menu size={20} color="#18181b" />
      </button>
      <button
        className="fixed top-[81px] left-[44px] z-[99999999]"
        onClick={() => handleCreateNewChat()}
      >
        <SquarePen size={18} color="#18181b" />
      </button>

      {/* div to make the right moving effect after opening sidebar */}
      <div
        className="h-[calc(100vh - 28px)] w-36 mt-24"
        style={{
          width: isSidebarOpen ? "144px" : 0,
          transition: "width 0.35s ease-in-out",
        }}
      ></div>

      {/* Actual sidebar */}
      <div
        className="h-[calc(100vh - 28px)] left-0 fixed w-36 top-28 flex z-[9999] rounded-tr-lg flex-col gap-2 pt-2 bg-[#F9F9F9]  items-center"
        style={{
          height: "calc(100vh - 28px)",
          left: isSidebarOpen ? 0 : "-144px",
          transition: "left 0.35s ease-in-out",
        }}
      >
        {/* Reversed so make the chats look like from the most recent made to top!! */}
        {/* {chatsState?.chats?.reverse().map((chat, i) => ( */}
        {chatsState?.map((chat, i) => (
          <UserChatButton
            email={email}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            chat={chat}
            key={i}
            setChatsState={setChatsState}
          />
        ))}
      </div>

      {/* ChatArea */}
      <ChatArea isSidebarOpen={isSidebarOpen} chatId={selectedChat} />
    </div>
  );
};

export default AiChatPage;
