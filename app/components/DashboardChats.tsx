"use client";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import useUserChats from "../(root)/ai/chat/useUserChats";

const DashboardChats = () => {
  const router = useRouter();
  const { chats, isLoading } = useUserChats();
  console.log(chats);
  return (
    <div className="rounded-lg max-h-fit border-[1px] flex flex-col gap-2 p-6 w-full">
      <CardTitle>Recent Chats</CardTitle>
      <CardDescription>Select any chat to begin with.</CardDescription>
      {chats.chats
        ?.reverse()
        .slice(0, 3)
        .map((chat, i) => (
          <div
            key={i}
            className="fade-parent w-full flex justify-between cursor-pointer p-2 hover:bg-zinc-100  transition border-[1px] rounded-lg text-sm font-semibold capitalize"
            onClick={() => {
              localStorage.setItem("recentChatId", chat.chatId);
              router.push("/ai/chat");
            }}
          >
            {chat.title}
            <span className="fade-icon">
              <MoveRight />
            </span>
          </div>
        ))}

      {/* <div
        className="fade-parent w-full flex justify-between cursor-pointer p-2 hover:bg-zinc-100  transition border-[1px] rounded-lg text-sm font-semibold capitalize"
        onClick={() => {
          localStorage.setItem("recentChatId", "234");
        }}
      >
        Artificial Intelligence Code help
        <span className="fade-icon">
          <MoveRight />
        </span>
      </div>
      <div
        className="fade-parent w-full flex justify-between cursor-pointer p-2 hover:bg-zinc-100  transition border-[1px] rounded-lg text-sm font-semibold capitalize"
        onClick={() => {
          localStorage.setItem("recentChatId", "234");
        }}
      >
        Resume Content Restructuring
        <span className="fade-icon">
          <MoveRight />
        </span>
      </div> */}

      {/* {localStorage.setItem("recentChatId","234")} */}
    </div>
  );
};

export default DashboardChats;
