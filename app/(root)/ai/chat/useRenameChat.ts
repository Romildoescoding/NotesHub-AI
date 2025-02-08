"use client";

import { useState } from "react";

const useRenameChat = () => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [error, setError] = useState(null);

  const renameChat = async (email: string, chatId: string, newName: string) => {
    setIsRenaming(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, chatId, newName }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to rename the chat: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error renaming chat:", err);
    } finally {
      setIsRenaming(false);
    }
  };

  return {
    renameChat,
    isRenaming,
    error,
  };
};

export default useRenameChat;
