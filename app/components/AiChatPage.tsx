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
import { motion } from "framer-motion";

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
    console.log(newChat.data.chats);
    console.log(newChat.data.chats[newChat.data.chats.length - 1].chatId);
    setSelectedChat(newChat.data.chats[newChat.data.chats.length - 1].chatId);
    console.log("------------------------------------------------");
  }

  return (
    <div className="h-full w-full flex relative overflow-hidden">
      {/* button to toggle sidebar */}
      <motion.button
        className="fixed top-18 left-[104px] rounded-sm  z-[999] text-zinc-500 hover:text-zinc-950 transition-all"
        onClick={() => setIsSidebarOpen((open) => !open)}
        style={{
          left: isSidebarOpen ? "248px" : "104px",
          transition: "left 0.35s ease-in-out",
        }}
        // initial={{ left: "104px" }}
        // animate={{ left: "248px" }}
      >
        {isSidebarOpen ? (
          <ChevronsLeft size={20} />
        ) : (
          <ChevronsRight size={20} />
        )}
      </motion.button>
      <motion.button
        className="fixed top-[79px] left-[138px] rounded-sm z-[999] text-zinc-500 hover:text-zinc-950 transition-all"
        onClick={() => handleCreateNewChat()}
        style={{
          left: isSidebarOpen ? "282px" : "138px",
          transition: "left 0.35s ease-in-out",
        }}
        // initial={{ left: "138px" }}
        // animate={{ left: "282px" }}
      >
        <span className="relative tooltip h-full w-full">
          <span className="tooltiptext">New Chat</span>
        </span>
        <SquarePen size={17} />
      </motion.button>

      {/* div to make the right moving effect after opening sidebar */}
      <div
        className="h-[calc(100vh - 28px)] w-36 mt-24"
        style={{
          width: isSidebarOpen ? "144px" : 0,
          transition: "width 0.35s ease-in-out",
        }}
      ></div>

      <motion.div
        className="h-[calc(100vh - 28px)] left-0 fixed w-36 top-16 flex z-[999] flex-col gap-2 pt-2 bg-white border-r-2 border-zinc-100 items-center"
        style={{
          height: "calc(100vh - 28px)",
          left: isSidebarOpen ? "88px" : "-56px",
          transition: "left 0.35s ease-in-out",
        }}
        // initial={{ left: "-56px" }}
        // animate={{ left: "88px" }}
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
      </motion.div>
      {/* </div> */}

      {/* ChatArea */}
      <ChatArea isSidebarOpen={isSidebarOpen} chatId={selectedChat} />
    </div>
  );
};

export default AiChatPage;
