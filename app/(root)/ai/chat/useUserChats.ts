import { useEffect, useState } from "react";

export default function useUserChats() {
  const [chats, setChats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchUserChats() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/userchats`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      setChats(data.data);
    }
    setIsLoading(true);
    fetchUserChats();
    setIsLoading(false);
  }, []);
  return { chats, isLoading, setChats };
}
