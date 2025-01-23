import { useEffect, useState } from "react";

export default function useChats(chatId) {
  const [chats, setChats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchChats() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats?chatId=${chatId}`
      );
      const data = await res.json();
      console.log(data);
      setChats(data.data);
    }
    setIsLoading(true);
    fetchChats();
    setIsLoading(false);
  }, [chatId]);
  return { chats, isLoading };
}
