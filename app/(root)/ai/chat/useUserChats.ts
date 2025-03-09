import { useEffect, useState } from "react";

export default function useUserChats() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchUserChats() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/userchats`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        setChats(data.data);
      } catch (err) {
        console.log(err);
        setChats([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserChats();
  }, []);
  return { chats, isLoading, setChats };
}
