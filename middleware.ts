import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/_lib/session";
import { cookies } from "next/headers";
import { auth } from "./auth";
// import { auth } from './auth';

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export default async function middleware(req: NextRequest) {
  const oAuthSession = await auth();
  // console.log(oAuthSession);
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect

  //for debugging purpose
  // console.log(isProtectedRoute);
  // console.log(!session?.userId);
  // console.log(!oAuthSession?.user);
  // console.log(isProtectedRoute && !session?.userId && !oAuthSession?.user);
  if (isProtectedRoute && !session?.userId && !oAuthSession?.user) {
    console.log("Redirected due to middleware");
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  //   if (
  //     isPublicRoute &&
  //     session?.userId &&
  //     !req.nextUrl.pathname.startsWith("/dashboard")
  //   ) {
  //     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  //   }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image).*)"],
// };

// export {auth as middleware};
