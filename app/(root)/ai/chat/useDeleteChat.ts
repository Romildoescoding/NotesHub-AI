"use client";

import { useState } from "react";

const useDeleteChat = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteChat = async (email: string, chatId: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chatId, email }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete the chat: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error renaming chat:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteChat,
    isDeleting,
    error,
  };
};

export default useDeleteChat;
