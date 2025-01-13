"use server";
import dbConnect from "@/app/_lib/dbConnect";
import { SigninFormSchema, SignupFormSchema } from "@/app/_lib/definitions";
import { createSession } from "@/app/_lib/session";
import User from "@/app/models/UserModel";
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
    await createSession(user.id);

    // Convert the Mongoose document into a plain object
    const plainUser = user.toObject(); // Converts Mongoose document to a plain object

    return {
      user: {
        id: plainUser._id.toString(), // Ensure ObjectId is converted to string
        name: plainUser.name,
        email: plainUser.email,
        createdAt: plainUser.createdAt,
      },
    };
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

    // 3. Initiate Session
    await createSession(user.id);

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
