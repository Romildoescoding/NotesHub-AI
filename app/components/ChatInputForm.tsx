import { File, Send } from "lucide-react";
import React, { useState } from "react";

const ChatInputForm = ({
  isSidebarOpen,
  sendMessage,
  setChats,
  setIsGeminiLoading,
  sendMessageAI,
  chatId,
  setShowModal,
}) => {
  const [message, setMessage] = useState("");

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
    <form
      onSubmit={handleSendMessage}
      style={{
        left: !isSidebarOpen ? "50%" : "calc(50% + 65px)",
        transition: "left 0.35s ease-in-out",
      }}
      className="w-full max-w-[60vw] bg-zinc-100 fixed bottom-0 left-1/2 -translate-x-1/2 pb-[36px] p-4 pt-2 rounded-t-xl"
    >
      <textarea
        // placeholder="Enter Message.."
        className="w-full h-auto max-h-[150px] bg-zinc-100 outline-none resize-none overflow-y-auto text-black rounded-lg p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
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

      <button
        className="p-1 flex items-center justify-center absolute bottom-2 left-2"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <span className="w-fit h-fit relative tooltip">
          <span
            className="tooltiptext"
            style={{
              top: "0%",
              right: "115%",
              left: "unset",
              minWidth: "64px",
              display: "flex",
              // fontSize: "10px",
            }}
          >
            Upload File
          </span>
          <File size={20} color="black" />
        </span>
      </button>
    </form>
  );
};

export default ChatInputForm;
