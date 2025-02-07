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
import ChatInputForm from "./ChatInputForm";
import Modal from "./Modal";
import ModalUploadPdf from "./ModalUploadPdf";
import usePdfGeminiAI from "../(dashboard)/dashboard/chat/usePdfGeminiAI";

//OPTIMIZE IT TO PREVENT RE-RENDERS ON ENTERING THE DATA IN THE TEXTAREA

const ChatArea = ({ chatId, isSidebarOpen }) => {
  const chatAreaRef = useRef(null);

  const { chats, isLoading, setChats } = useChats(chatId);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [showModal, setShowModal] = useState("");
  const { user, status } = useCurrentUser();
  const { sendMessage, isSending, error } = useSendMessage();
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const {
    sendMessageAI,
    isSending: isSendingAI,
    error: errorAI,
  } = useGeminiAI();

  const {
    sendPDfMessageAI,
    isSending: isSending2,
    error: errorPDF,
  } = usePdfGeminiAI();

  //Scrolling into the latest message to bottom..
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, isGeminiLoading]);

  return (
    // <SessionProvider>
    <>
      {showModal === "select-file" && (
        <Modal setShowModal={setShowModal}>
          <ModalUploadPdf
            chatId={chatId}
            setShowModal={setShowModal}
            setSelectedPdfFile={setSelectedPdfFile}
          />
        </Modal>
      )}

      <div
        className={`w-full relative flex justify-center h-fit min-h-[calc(100vh-80px)] pt-4 ${
          selectedPdfFile ? "pb-40" : "pb-28"
        }`}
      >
        <div
          className="w-full max-w-[60vw] h-fit flex flex-col gap-4"
          style={{
            alignItems:
              !status || status === "loading" || status === ""
                ? "center"
                : "top",
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

          <ChatInputForm
            selectedPDfFile={selectedPdfFile}
            setSelectedPdfFile={setSelectedPdfFile}
            sendPDfMessageAI={sendPDfMessageAI}
            isSidebarOpen={isSidebarOpen}
            sendMessage={sendMessage}
            setChats={setChats}
            setIsGeminiLoading={setIsGeminiLoading}
            sendMessageAI={sendMessageAI}
            chatId={chatId}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    </>
    // </SessionProvider>
  );
};

export default ChatArea;
