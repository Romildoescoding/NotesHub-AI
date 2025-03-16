import dbConnect from "@/app/_lib/dbConnect";
import { verifySession } from "@/app/_lib/session";
import User from "@/app/models/UserModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decode } from "punycode";

// export async function GET(req) {
//   try {
//     const cookieStore = await cookies();
//     console.log(cookieStore);

//     // console.log(req);
//     await dbConnect();
//     console.log("ROUTE HIT!!!!");
//     // console.log(req.cookie);

//     // Verify session
//     const session = await verifySession();
//     // console.log(session);
//     if (!session?.user?.email) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     // Fetch user from the database
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return new Response(JSON.stringify({ error: "User not found" }), {
//         status: 404,
//       });
//     }

//     // Return filtered user data
//     const filteredUser = userDTO(user);
//     return new Response(JSON.stringify(filteredUser), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }

export async function GET(req) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("session")?.value;
  console.log(token);

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    // Verify the token
    const decoded = await verifySession();

    // Return user information (excluding sensitive data)
    return NextResponse.json({
      user: decoded.user,
    });
  } catch (error) {
    // Token is invalid or expired
    console.log("ERROR!!!!!!!!!!!!!", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    // Parse request body
    // The valuesToUpdate can contain following values optionally
    // const {name, profTitle, image, profession} = req.body;
    const valuesToUpdate = await req.json();
    if (valuesToUpdate.image) return;

    // Connect to DB
    await dbConnect();

    // Verify the session and get user email
    const decoded = await verifySession();
    const email = decoded.user?.email;

    // Update the user document in the database
    const result = await User.findOneAndUpdate(
      { email },
      { $set: valuesToUpdate }, // Dynamically set fields to update
      { new: true } // Return the updated document
    );

    // If user not found
    if (!result) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Success response
    return Response.json(
      { success: true, message: "Profile updated successfully", user: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to filter user data
function userDTO(user) {
  return { name: user.name, email: user.email, image: user.image };
}
