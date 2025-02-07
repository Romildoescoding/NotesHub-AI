import { File, FileText, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { deleteFileFromSupabase } from "../(dashboard)/dashboard/upload/uploadFile";

const ChatInputForm = ({
  isSidebarOpen,
  sendMessage,
  setChats,
  setIsGeminiLoading,
  sendMessageAI,
  chatId,
  setShowModal,
  selectedPDfFile,
  setSelectedPdfFile,
  sendPDfMessageAI,
}) => {
  const [message, setMessage] = useState("");
  console.log(selectedPDfFile);

  const pdfUrlToBUffer = async (pdfUrl) => {
    try {
      const pdfResponse = await fetch(pdfUrl);
      const pdfBuffer = await pdfResponse.arrayBuffer();
      return pdfBuffer;
    } catch (err) {
      console.error("Error fetching or processing PDF:", err);
    }
  };

  const handleSendMessage = async (e: SubmitEvent) => {
    console.log("Selected Pdf file is-->");
    console.log(selectedPDfFile);
    e.preventDefault();

    if (!message.trim()) return;

    //Remeber, i need to create another table to store the chatIs mapped to userids to fetch the previous cahts okay!!??
    try {
      setMessage("");
      const sender = "user";
      let fileMessage;
      console.log(selectedPDfFile);
      console.log(chatId === selectedPDfFile.chatId);
      console.log({
        chatId,
        sender,
        content: "",
        document: selectedPDfFile.title,
      });
      if (selectedPDfFile && chatId === selectedPDfFile.chatId) {
        fileMessage = await sendMessage({
          chatId,
          sender,
          content: "",
          document: selectedPDfFile.title,
        });
      }
      const newMessage = await sendMessage({
        chatId,
        sender,
        content: message.trim(),
      });

      console.log("USER MESSAGE-------------------------------------");
      //Simulate realtime updates
      console.log(newMessage);
      console.log("USER MESSAGE-------------------------------------");
      setChats((chats) => {
        return fileMessage
          ? [...chats, fileMessage.data, newMessage.data]
          : [...chats, newMessage.data];
      });

      //Set gemini to loading
      setIsGeminiLoading(true);

      console.log("GOING TO AI");
      let data;
      if (selectedPDfFile) {
        const pdfBuffer = await pdfUrlToBUffer(selectedPDfFile.fileUrl);
        data = await sendPDfMessageAI(pdfBuffer, message.trim());
      } else {
        data = await sendMessageAI(message.trim());
      }
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

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedPDfFile]);

  return (
    <form
      onSubmit={handleSendMessage}
      style={{
        left: !isSidebarOpen ? "50%" : "calc(50% + 65px)",
        transition: "left 0.35s ease-in-out",
      }}
      className="w-full max-w-[60vw] bg-zinc-100 fixed bottom-0 left-1/2 -translate-x-1/2 pb-[36px] p-4 pt-2 rounded-t-xl"
    >
      {/* Dispaly the selected pdf only in the chat session it was selected in yk.. */}
      {selectedPDfFile && chatId === selectedPDfFile.chatId && (
        <div className=" w-full flex justify-end">
          <div className="relative bg-zinc-200 mt-2 ml-2 h-12 gap-2 flex items-center justify-start pl-[6px] w-fit pr-6 rounded-md">
            <div className=" h-fit w-fit p-1 py-2 bg-zinc-900 rounded-md">
              <FileText size={20} className="text-white" />
            </div>
            <span className=" text-sm">
              {selectedPDfFile.title.length > 14
                ? selectedPDfFile.title.slice(0, 15) + "..."
                : selectedPDfFile.title}
            </span>
            <button
              onClick={async (e) => {
                e.preventDefault();
                //It means the file had to be uploaded to supabase for this shit like why did you even select that file in first place dude...
                if (!selectedPDfFile.isNote) {
                  // The selectedPDfFile object would look like ... { fileUrl :"https://-----", title:"The File Name", isNote:false, chatId: "3ejfibd2y8ehnd"}
                  //So, i bet it would need the use of fileUrl to delete right....
                  await deleteFileFromSupabase(selectedPDfFile.fileUrl);
                }
                setSelectedPdfFile(null);
              }}
              className="absolute rounded-full  right-2 top-2"
            >
              <X
                size={16}
                className="hover:text-zinc-950 transition-all text-zinc-600"
              />
            </button>
          </div>
        </div>
      )}

      <textarea
        ref={inputRef}
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
          setShowModal("select-file");
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
