"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
import useGeminiAI from "../(dashboard)/dashboard/chat/useGeminiAI";

//OPTIMIZE IT TO PREVENT RE-RENDERS ON ENTERING THE DATA IN THE TEXTAREA

const ChatArea = ({ chatId, isSidebarOpen }) => {
  const chatAreaRef = useRef(null);
  const [message, setMessage] = useState("");
  const { chats, isLoading, setChats } = useChats(chatId);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const { user, status } = useCurrentUser();
  console.log(chats);
  const { sendMessage, isSending, error } = useSendMessage();
  const {
    sendMessageAI,
    isSending: isSendingAI,
    error: errorAI,
  } = useGeminiAI();

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, isGeminiLoading]);

  const handleSendMessage = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    //Remeber, i need to create another table to store the chatIs mapped to userids to fetch the previous cahts okay!!??
    try {
      setMessage("");
      const sender = "user";
      const newMessage = await sendMessage({
        chatId,
        sender,
        content: message.trim(),
      });

      console.log("USER MESSAGE-------------------------------------");
      //Simulate realtime updates
      console.log(newMessage);
      console.log("USER MESSAGE-------------------------------------");
      setChats((chats) => [...chats, newMessage.data]);

      //Set gemini to loading
      setIsGeminiLoading(true);

      console.log("GOING TO AI");
      const data = await sendMessageAI(message.trim());
      console.log("GONE TO AI");
      console.log(data);
      const aiContent = data.candidates[0].content.parts[0].text;
      const message1 = await sendMessage({
        chatId,
        sender: "ai",
        content: aiContent,
      });

      //Set gemini to idle
      setIsGeminiLoading(false);
      console.log("AI REPLY-------------------------------------");
      console.log(message1);
      console.log("AI REPLY-------------------------------------");
      //Simulate realtime updates
      setChats((chats) => [...chats, message1.data]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    // <SessionProvider>
    <div className="w-full relative flex justify-center h-fit pt-24 pb-28">
      <div
        className="w-full max-w-[60vw] h-fit flex flex-col gap-4"
        style={{
          alignItems:
            !status || status === "loading" || status === "" ? "center" : "top",
          justifyContent:
            !status || status === "loading" || status === ""
              ? "center"
              : "start",
        }}
      >
        {!status || status === "loading" || status === "" || !chats ? (
          <Spinner height={24} width={24} isWhite={false} />
        ) : (
          <>
            {chats.map((message, i) =>
              message.sender === "ai" ? (
                <AiMessage key={i} text={message.content} />
              ) : (
                <UserMessage key={i} user={user} text={message.content} />
              )
            )}
            {isGeminiLoading && <AiMessage text={""} />}
            {/* Scroll to the bottom yk */}
            <div ref={chatAreaRef} /> {/* Scroll target */}
          </>
        )}

        {/* INPUT BOX FOR QUESTIONS */}
        <form
          onSubmit={handleSendMessage}
          style={{
            left: !isSidebarOpen ? "50%" : "calc(50% + 62px)",
            transition: "left 0.35s ease-in-out",
          }}
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
