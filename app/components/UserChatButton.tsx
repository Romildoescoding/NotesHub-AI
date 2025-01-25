import { Ellipsis } from "lucide-react";
import React from "react";

const UserChatButton = ({ chat, setSelectedChat, selectedChat }) => {
  return (
    <button
      className=" p-2 px-4 hover:bg-zinc-100 oultine-none rounded-lg flex gap-3 text-xs items-center transition-all"
      onClick={() => setSelectedChat(chat.chatId)}
      style={{ background: selectedChat === chat.chatId ? "#e4e4e7" : "auto" }}
    >
      {chat.title}
      <span className=" cursor-pointer">
        <Ellipsis size={15} className="hover:text-red-500" color="#18181b" />
      </span>
    </button>
  );
};

export default UserChatButton;
