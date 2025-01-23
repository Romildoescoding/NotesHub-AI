import { useSession } from "next-auth/react";
import { getUserClient } from "../_lib/actions";
import { useEffect, useState } from "react";

//Status === "" || "authenticated" || "error" and here "" means idle state
export function useCurrentUser() {
  const [user, setUser] = useState({}); // Default to null
  const [status, setStatus] = useState(""); // idle, loading, authenticated, error
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      setStatus("loading");
      try {
        const fetchedUser = await getUserClient();
        setUser(fetchedUser.user);
        setStatus("authenticated");
      } catch (error) {
        console.error("Error fetching user:", error);
        setStatus("error");
      }
    };

    if (session?.user) {
      // Use session user directly if available
      setUser(session.user);
      setStatus("authenticated");
    } else {
      // Fetch user data if session user is not available
      fetchUser();
    }
  }, [session]);

  return { user, status };
}
