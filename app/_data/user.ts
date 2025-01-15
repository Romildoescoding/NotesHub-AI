import { cache } from "react";
import { verifySession } from "../_lib/session";
import User from "../models/UserModel";
import dbConnect from "../_lib/dbConnect";

export const getUser = cache(async () => {
  //Verify session
  try {
    await dbConnect();
    const session = await verifySession();
    //   console.log(session);
    //Fetch user data
    const user = await User.findOne({ email: session.user?.email });
    const filteredUser = userDTO(user);
    return filteredUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching a user");
  }
});

//FILTERING THE USER TO PROVIDE ONLY USERNAME, EMAIL AND IMAGE
function userDTO(user) {
  return { name: user.name, email: user.email, image: user.image };
}
