"use client";

import { useState } from "react";

const useNewChat = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const createNewChat = async (email: string) => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error sending message:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createNewChat,
    isCreating,
    error,
  };
};

export default useNewChat;
