"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getUser } from "../_data/user";
import { Copy, Send } from "lucide-react";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";
import { getUserClient } from "../_lib/actions";
import { SessionProvider, useSession } from "next-auth/react";
import Spinner from "./Spinner";
import { useCurrentUser } from "../auth/useCurrentUser";
import useChats from "../(dashboard)/dashboard/chat/useChats";
import useSendMessage from "../(dashboard)/dashboard/chat/useSendMessage";

const ChatArea = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const { chats, isLoading } = useChats(chatId);
  const { user, status } = useCurrentUser();
  console.log(chats);
  const { sendMessage, isSending, error } = useSendMessage();

  const handleSendMessage = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    //Remeber, i need to create another table to store the chatIs mapped to userids to fetch the previous cahts okay!!??
    try {
      const sender = "user";
      await sendMessage({
        chatId,
        sender,
        content: message.trim(),
      });

      setMessage(""); // Clear the input field
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    // <SessionProvider>
    <div className="w-full flex justify-center h-fit pt-24">
      <div
        className="w-full max-w-[60vw] h-screen flex flex-col gap-2"
        style={{
          alignItems:
            !status || status === "loading" || status === "" ? "center" : "top",
          justifyContent:
            !status || status === "loading" || status === ""
              ? "center"
              : "start",
        }}
      >
        {!status || status === "loading" || status === "" ? (
          <Spinner height={24} width={24} isWhite={false} />
        ) : (
          <>
            <AiMessage />
            <UserMessage user={user} />
          </>
        )}

        {/* INPUT BOX FOR QUESTIONS */}
        <form
          onSubmit={handleSendMessage}
          className="w-full max-w-[60vw] bg-zinc-100 fixed bottom-0 left-1/2 -translate-x-1/2 pb-6 p-4 pt-4 rounded-t-lg"
        >
          <textarea
            placeholder="Enter Message.."
            className="w-full h-auto max-h-[150px] bg-zinc-100 outline-none resize-none overflow-y-auto  text-black rounded-lg p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            //Resize to max-150px on inputs just like ChatGPT does ><
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button
            className="p-2 pr-[10px] pt-[10px] rounded-full bg-zinc-900 flex items-center justify-center absolute bottom-2 right-2"
            type="submit"
          >
            <Send size={15} color="white" />
          </button>
        </form>
      </div>
    </div>
    // </SessionProvider>
  );
};

export default ChatArea;
