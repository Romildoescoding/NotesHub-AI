import { Ellipsis, Pen, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import useRenameChat from "../(dashboard)/dashboard/chat/useRenameChat";

const UserChatButton = ({ email, chat, setSelectedChat, selectedChat }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(chat.title || "");
  const { renameChat, isRenaming: isRenamingLoading } = useRenameChat();
  const [isHovered, setIsHovered] = useState(false);

  // Single ref to handle both rename input and options menu
  const containerRef = useOutsideClick(() => {
    if (isRenaming) {
      handleRenameEnd();
    } else if (showOptions) {
      setShowOptions(false);
    }
  });

  const handleRenameEnd = () => {
    setIsRenaming(false);
    if (renameValue !== chat.title && renameValue.length > 0) {
      renameChat(email, chat.chatId, renameValue);
    }
    if (renameValue.length <= 0) {
      setRenameValue(chat.title);
    }
  };

  useEffect(() => {
    if (isRenaming && containerRef.current) {
      containerRef.current.querySelector("input")?.focus();
    }
  }, [isRenaming, containerRef]);

  return (
    <div
      className="p-2 px-4 hover:bg-zinc-200 outline-none relative rounded-lg flex gap-3 text-xs items-center transition-all cursor-pointer min-w-[131px] max-w-[131px]"
      onClick={(e) => {
        // if (e.target.tagName === "SPAN") return;
        setSelectedChat(chat.chatId);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background:
          selectedChat === chat.chatId
            ? "#e4e4e7"
            : isHovered
            ? "#efefef"
            : "#fafafa",
      }}
    >
      <div
        ref={containerRef}
        className="relative flex gap-2 items-center justify-start w-full"
      >
        {isRenaming ? (
          <input
            type="text"
            value={renameValue}
            className="w-[80px]"
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRenameEnd();
              }
            }}
            onBlur={handleRenameEnd}
          />
        ) : //In order to simulate realtime update ><.. gonna have to do this a lot I guess..
        renameValue.length > 11 ? (
          renameValue.slice(0, 11) + ".."
        ) : (
          renameValue
        )}

        {/* The options pop-up */}
        {showOptions && (
          <span className="absolute flex flex-col gap-1 top-[75%] z-[9999] left-[90%] rounded-lg h-fit w-fit p-2 bg-zinc-50 shadow-md shadow-[#ccc]">
            <span
              className="flex gap-2 pointer w-full rounded-md h-fit p-2 hover:bg-zinc-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
              }}
            >
              <Pen size={15} color="#18181b" /> Rename
            </span>
            <span className="flex gap-2 pointer w-full rounded-md h-fit p-2 hover:bg-zinc-200">
              <Trash2 size={15} color="#18181b" /> Delete
            </span>
          </span>
        )}
        {!isRenaming && (
          <span
            className="cursor-pointer tooltip"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(true);
            }}
          >
            {!showOptions && <span className="tooltiptext">Options</span>}
            <Ellipsis size={15} className="" color="#18181b" />
          </span>
        )}
      </div>
    </div>
  );
};

export default UserChatButton;
