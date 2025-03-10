import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import dbConnect from "./app/_lib/dbConnect";
// import User from "./app/models/UserModel";
// import { handler } from "./app/auth/register/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
});

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Google, GitHub],
//   callbacks: {
//     async session({ session }) {
//       console.log(session);
//       // Connect to the database
//       await dbConnect();

//       // Find user in the database
//       const dbUser = await User.findOne({ email: session.user.email });

//       if (dbUser) {
//         // session.user.id = dbUser._id.toString(); // Add user ID
//         session.user.profession = dbUser.profession || "";
//         session.user.professionalTitle = dbUser.professionalTitle;
//       } else {
//         await handler(session);
//       }

//       return session;
//     },
//   },
// });

// export const runtime = "nodejs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Google, GitHub],
//   callbacks: {
//     async signIn({ user }) {
//       console.log("signin");
//       await dbConnect();

//       // Check if the user already exists
//       const existingUser = await User.findOne({ email: user.email });

//       if (!existingUser) {
//         console.log("Creating a new account");

//         // Create a new user if not found
//         await User.create({
//           email: user.email,
//           name: user.name,
//           provider: user.image?.includes("google")
//             ? "google"
//             : user.image?.includes("github")
//             ? "github"
//             : "custom",
//           providerId: user.email,
//           image: user.image,
//         });
//       }

//       return true; // Allow sign-in
//     },

//     async session({ session }) {
//       console.log("Session: ", session);
//       await dbConnect();

//       const dbUser = await User.findOne({ email: session.user.email });

//       if (dbUser) {
//         session.user.profession = dbUser.profession || "";
//         session.user.professionalTitle = dbUser.professionalTitle || "";
//       }

//       return session;
//     },
//   },
// });
