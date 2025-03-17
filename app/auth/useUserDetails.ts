import { useSession } from "next-auth/react";
import { getUserDetails } from "../_lib/actions";
import { useEffect, useState, useCallback } from "react";

interface User {
  name?: string | null;
  email: string;
  image: string;
  profession: string;
  professionalTitle: string;
}

export function useUserDetails() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    image: "",
    profession: "",
    professionalTitle: "",
  });
  const [status, setStatus] = useState("");
  const { data: session } = useSession();

  // ✅ Create a function to re-fetch user details
  const fetchUser = useCallback(async (email: string | null) => {
    setStatus("loading");
    try {
      const fetchedUser = await getUserDetails(email);
      setUser(fetchedUser.user);
      setStatus("authenticated");
    } catch (error) {
      console.error("Error fetching user:", error);
      setStatus("error");
    }
  }, []);

  // handles the empty user session case with this check
  useEffect(() => {
    if (session?.user?.email) {
      fetchUser(session.user.email);
      setStatus("authenticated");
    } else {
      fetchUser(null);
    }
  }, [session?.user, fetchUser]);

  return {
    user,
    status,
    refetchUser: () => fetchUser(session?.user?.email || null),
  };
}
