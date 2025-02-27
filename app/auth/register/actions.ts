"use server";
import dbConnect from "@/app/_lib/dbConnect";
import { SigninFormSchema, SignupFormSchema } from "@/app/_lib/definitions";
import { createSession } from "@/app/_lib/session";
import User from "@/app/models/UserModel";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(state, formData: FormData) {
  //1. Validate Fields
  const validationResult = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log(validationResult.error?.flatten());
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  //2. Create User
  const { name, email, password } = validationResult.data;
  let isNewUser: boolean = true;

  try {
    await dbConnect();

    const userData = await User.findOne({ email });

    if (userData) {
      isNewUser = false;
      console.log("Email already found");

      //IN CASE OF USRE REGISTER ADN ACCOUNT EXISTS BUT WITH NOT CUSTOM PROVIDER
      if (userData.provider !== "custom") {
        console.log("Not Custom Provider");
        return {
          errors: {
            general: `An account with this email already exists. Please use ${
              userData.provider[0].toUpperCase() + userData.provider.slice(1)
            } to login`,
          },
        };
      }

      return {
        errors: {
          general: "An account with this email already exists. Try logging in.",
        },
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "custom", // Since it's a custom sign up
      providerId: email, // Use email as providerId for custom auth
    });

    console.log("User Created:", user);

    // 3. Initiate Session
    // You can implement session creation here (e.g., using NextAuth or JWT)
    await createSession({
      user: { name: user.name, email: user.email, image: user.image },
    });

    // Convert the Mongoose document into a plain object
    const plainUser = user.toObject();

    return {
      user: {
        id: plainUser._id.toString(), // Ensure ObjectId is converted to string
        name: plainUser.name,
        email: plainUser.email,
        createdAt: plainUser.createdAt,
      },
    };
    // await createSession(user.id)
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      errors: { general: "Error creating user. Please try again." },
    };
  } finally {
    if (isNewUser) redirect("/dashboard");
  }
}

export async function signin(state, formData: FormData) {
  // 1. Validate Fields
  const validationResult = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log(validationResult.error?.flatten());
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 2. Authenticate User
  const { email, password } = validationResult.data;
  console.log(email, password);
  //FLAG TO CHECK IF REDIRECT TO DASHBOARD ONLY IF USER IS AUTHORIZED.
  let isValidUser: boolean = false;

  await dbConnect();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("No email found");
      return {
        errors: { general: "Invalid email or password." },
      };
    }
    // console.log(user);
    if (user.provider !== "custom") {
      console.log("Not Custom Provider");
      return {
        errors: {
          general: `An account with this email already exists. Please use ${
            user.provider[0].toUpperCase() + user.provider.slice(1)
          } to login`,
        },
      };
    }
    console.log(password);
    console.log(user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password did not match");
      return {
        errors: { general: "Invalid email or password." },
      };
    }

    console.log("User Authenticated:", user);

    //VALIDATE THE FLAG
    isValidUser = true;
    console.log(user);
    // 3. Initiate Session
    // await createSession(user.id);
    await createSession({
      user: { name: user.name, email: user.email, image: user.image },
    });

    // Convert the Mongoose document into a plain object
    const plainUser = user.toObject();

    return {
      user: {
        id: plainUser._id.toString(), // Ensure ObjectId is converted to string
        name: plainUser.name,
        email: plainUser.email,
        createdAt: plainUser.createdAt,
      },
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    return {
      errors: { general: "Error signing in. Please try again." },
    };
  } finally {
    if (isValidUser) {
      redirect("/dashboard");
    } else {
    }
  }
}

import { auth } from "@/auth"; // Adjust import based on your setup

// export async function signInViaOAuth(provider: string) {
//   // Redirect to the OAuth provider
//   console.log("OAUTH CALLED");
//   await signIn(provider);
//   console.log("SignIn Called properly --------------------------------");

//   // After redirection back to your app, get the user session
//   const session = await auth();
//   console.log("SESSION IS---->" + session);

//   if (!session || !session?.user) {
//     console.log("No session in OAuth !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     throw new Error("Failed to retrieve user session after OAuth login.");
//   }

//   const { email, name, id, image } = session.user;
//   console.log(email, name, id, image);

//   try {
//     // Check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create a new user if not found
//       user = await User.create({
//         email,
//         name,
//         provider,
//         providerId: id,
//         image,
//       });
//     }

//     // Redirect to the dashboard or grant access
//     redirect("/dashboard");
//   } catch (error) {
//     console.error("Error during sign-in via OAuth:", error);
//     throw new Error("Unable to complete the sign-in process.");
//   }
// }

export async function handler() {
  // Redirect to the OAuth provider
  // console.log("handler called");

  // After redirection back to your app, get the user session
  const session = await auth();
  // console.log("SESSION IS---->");
  // console.log(session);
  if (!session || !session?.user) {
    console.log("No session in OAuth handler");
    return;
  }

  const { email, name, id, image } = session.user;
  // console.log(email, name, id, image);

  try {
    // Check if user exists
    await dbConnect();
    let user = await User.findOne({ email });

    if (!user) {
      console.log("Creating a new account");
      // Create a new user if not found
      user = await User.create({
        email,
        name,
        provider: image?.includes("google")
          ? "google"
          : image?.includes("github")
          ? "github"
          : "custom",
        providerId: email,
        image,
      });
    } else {
      console.log("Account already created");
    }

    // Redirect to the dashboard or grant access
    // redirect("/dashboard");
  } catch (error) {
    console.error("Error during sign-in via OAuth:", error);
    throw new Error("Unable to complete the sign-in process.");
  }
}
