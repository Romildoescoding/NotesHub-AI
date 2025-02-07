"use client";
import React, { useEffect, useState } from "react";
import ChatArea from "./ChatArea";
import {
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Ellipsis,
  EllipsisVertical,
  Menu,
  SquarePen,
} from "lucide-react";
import UserChatButton from "./UserChatButton";
import useNewChat from "../(dashboard)/dashboard/chat/useNewChat";

const AiChatPage = ({ email, chats }) => {
  //  Create a selectedChat state and a hook that fetches all the messages/chats regarding that specific userChat
  const [selectedChat, setSelectedChat] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { createNewChat, isCreating, error } = useNewChat();

  //Simulate realtime update on new chats
  const [chatsState, setChatsState] = useState(chats.chats);

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
    <div className="h-full w-full flex relative overflow-hidden">
      {/* button to toggle sidebar */}
      <button
        className="fixed top-18 left-[104px] rounded-sm  z-[99999999] text-zinc-500 hover:text-zinc-950 transition-all"
        onClick={() => setIsSidebarOpen((open) => !open)}
        style={{
          left: isSidebarOpen ? "248px" : "104px",
          transition: "left 0.35s ease-in-out",
        }}
      >
        {isSidebarOpen ? (
          <ChevronsLeft size={20} />
        ) : (
          <ChevronsRight size={20} />
        )}
      </button>
      <button
        className="fixed top-[79px] left-[138px] rounded-sm z-[99999999] text-zinc-500 hover:text-zinc-950 transition-all"
        onClick={() => handleCreateNewChat()}
        style={{
          left: isSidebarOpen ? "282px" : "138px",
          transition: "left 0.35s ease-in-out",
        }}
      >
        <span className="relative tooltip h-full w-full">
          <span className="tooltiptext">New Chat</span>
        </span>
        <SquarePen size={17} />
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
      {/* <div className="h-screen relative w-36 bg-red-700"> */}
      <div
        className="h-[calc(100vh - 28px)] left-0 fixed w-36 top-16 flex z-[999] flex-col gap-2 pt-2 bg-zinc-100  items-center"
        style={{
          height: "calc(100vh - 28px)",
          left: isSidebarOpen ? "88px" : "-56px",
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
      {/* </div> */}

      {/* ChatArea */}
      <ChatArea isSidebarOpen={isSidebarOpen} chatId={selectedChat} />
    </div>
  );
};

export default AiChatPage;
