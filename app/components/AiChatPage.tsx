"use client";
import React, { useEffect, useState } from "react";
import ChatArea from "./ChatArea";
import { Ellipsis, EllipsisVertical, Menu, SquarePen } from "lucide-react";
import UserChatButton from "./UserChatButton";

const AiChatPage = ({ chats }) => {
  //  Create a selectedChat state and a hook that fetches all the messages/chats regarding that specific userChat
  const [selectedChat, setSelectedChat] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Use useEffect to access localStorage only in the browser
  useEffect(() => {
    const recentChatId =
      localStorage.getItem("recentChatId") || chats.chats[0]?.chatId || "";
    setSelectedChat(recentChatId);
  }, [chats]);

  useEffect(() => {
    if (selectedChat) {
      localStorage.setItem("recentChatId", selectedChat);
    }
  }, [selectedChat]);

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
        onClick={() => setIsSidebarOpen((open) => !open)}
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
        className="h-[calc(100vh - 28px)] left-0 fixed w-36 top-28 flex flex-col gap-2  items-center"
        style={{
          height: "calc(100vh - 28px)",
          left: isSidebarOpen ? 0 : "-144px",
          transition: "left 0.35s ease-in-out",
        }}
      >
        {chats?.chats?.map((chat, i) => (
          <UserChatButton
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            chat={chat}
            key={i}
          />
        ))}
      </div>

      {/* ChatArea */}
      <ChatArea isSidebarOpen={isSidebarOpen} chatId={selectedChat} />
    </div>
  );
};

export default AiChatPage;
