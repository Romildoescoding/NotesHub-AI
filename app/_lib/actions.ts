import Chat from "../models/ChatsModel";
import dbConnect from "./dbConnect";

export const getUserClient = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const user = await response.json();
    console.log(user);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch user");
    // }

    // const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
