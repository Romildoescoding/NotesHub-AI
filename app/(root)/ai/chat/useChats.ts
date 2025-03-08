import { useEffect, useState } from "react";

export default function useChats(chatId) {
  const [chats, setChats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchChats() {
      console.log(chatId);
      // If chatId is not found.. it causes two request to overlap just like described in the one video about cons of fetch api.. it would not arise if the react-query would have been used.. But well i know how to use it and i am building this project to learn new things.. So, that's why I have tried using just the fetch api approach
      // So, it needs to checked before making a new request..
      if (!chatId) {
        return setChats([]);
      }
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
  return { chats, isLoading, setChats };
}
