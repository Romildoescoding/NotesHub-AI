import { useSession } from "next-auth/react";
import { getUserDetails } from "../_lib/actions";
import { useEffect, useState } from "react";

interface User {
  name?: string | null;
  email: string;
  image: string;
  profession: string;
  professionalTitle: string;
}

//Status === "" || "authenticated" || "error" and here "" means idle state
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

  useEffect(() => {
    const fetchUser = async (email: string | null) => {
      setStatus("loading");
      try {
        const fetchedUser = await getUserDetails(email);
        setUser(fetchedUser.user);
        setStatus("authenticated");
      } catch (error) {
        console.error("Error fetching user:", error);
        setStatus("error");
      }
    };

    console.log("SESSION USER PRINTED AS--->");
    console.log(session?.user);

    if (session?.user) {
      // Use session user directly if available
      fetchUser(session.user.email);
      setStatus("authenticated");
    } else {
      // Fetch user data if session user is not available
      fetchUser(null);
    }
  }, [session?.user]);
  //   }, [session]);

  return { user, status };
}
