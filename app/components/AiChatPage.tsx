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
import useNewChat from "../(root)/ai/chat/useNewChat";
import { motion } from "framer-motion";
import { useSidebar } from "../context/SidebarContext";

const AiChatPage = ({ email, chats }) => {
  console.log(chats);
  //  Create a selectedChat state and a hook that fetches all the messages/chats regarding that specific userChat
  const [selectedChat, setSelectedChat] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false);
  const { createNewChat, isCreating, error } = useNewChat();
  const { collapsed } = useSidebar();

  //Simulate realtime update on new chats
  const [chatsState, setChatsState] = useState(chats.chats);

  // Use useEffect to access localStorage only in the browser
  useEffect(() => {
    const recentChatId =
      localStorage.getItem("recentChatId") || chatsState[0]?.chatId || "";
    setSelectedChat(recentChatId);
  }, [chatsState]);

  useEffect(() => {
    setIsMainSidebarOpen(
      localStorage.getItem("isSidebarOpen") === "true" ? true : false
    );
  }, []);

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
        className={`fixed z-[99999999999] top-18 ${
          collapsed
            ? isSidebarOpen
              ? "left-[160px] min-[450px]:left-[248px]"
              : "left-[16px] min-[450px]:left-[104px]"
            : isSidebarOpen
            ? // + 176px
              "left-[336px] min-[450px]:left-[348px]"
            : "left-[192px] min-[450px]:left-[204px]"
        } rounded-sm  z-[999] text-zinc-500 hover:text-zinc-950 transition-all`}
        onClick={() => setIsSidebarOpen((open) => !open)}
        style={{
          // left: collapsed
          //   ? isSidebarOpen
          //     ? "248px"
          //     : "104px"
          //   : isSidebarOpen
          //   ? "348px"
          //   : "204px",
          transition: "left 0.3s",
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
        className={`fixed z-[99999999999] top-18 ${
          collapsed
            ? isSidebarOpen
              ? "left-[190px] min-[450px]:left-[278px]"
              : "left-[46px] min-[450px]:left-[134px]"
            : isSidebarOpen
            ? // + 176px
              "left-[366px] min-[450px]:left-[378px]"
            : "left-[222px] min-[450px]:left-[234px]"
        } rounded-sm  z-[999] text-zinc-500 hover:text-zinc-950 transition-all`}
        onClick={() => setIsSidebarOpen((open) => !open)}
        style={{
          // left: collapsed
          //   ? isSidebarOpen
          //     ? "248px"
          //     : "104px"
          //   : isSidebarOpen
          //   ? "348px"
          //   : "204px",
          transition: "left 0.3s",
        }}
        // initial={{ left: "104px" }}
        // animate={{ left: "248px" }}
      >
        <span className="relative tooltip h-full w-full">
          <span className="tooltiptext">New Chat</span>
        </span>
        <SquarePen size={17} />
      </motion.button>

      {/* div to make the right moving effect after opening sidebar */}
      <div
        className={`h-[calc(100vh - 28px)] 
            ${
              collapsed
                ? isSidebarOpen
                  ? "w-[0px] min-[600px]:w-[54px] min-[900px]:w-[178px]"
                  : "w-[0px] min-[600px]:w-[54px]" // +54px
                : isSidebarOpen
                ? // +110px

                  "w-[0px] min-[600px]:w-[204px] min-[900px]:w-[328px]"
                : "w-[0px] min-[600px]:w-[204px]" // +54px
              //   "w-[0px] min-[600px]:w-[480px]"
              // : "w-[0px] min-[600px]:w-[230px]" // +54px
            } transition-left bg-white duration-300 ease-in-out`}
      ></div>

      <motion.div
        className={`fixed top-16 w-36 px-2 flex flex-col gap-2 pt-4 bg-white border-r-2 border-zinc-100 items-center text-sm z-[997] transition-left duration-300 ease-in-out
    ${
      collapsed
        ? isSidebarOpen
          ? "left-0 min-[450px]:left-[88px]"
          : "-left-[144px] min-[450px]:left-[-56px]"
        : isSidebarOpen
        ? "left-[184px] min-[450px]:left-[184px]"
        : "left-[40px] min-[450px]:left-[40px]"
    }
  `}
        style={{ height: "calc(100vh - 28px)" }}
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
