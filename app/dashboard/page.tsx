import { redirect } from "next/navigation";
import { verifySession } from "../_lib/session";
import { auth } from "@/auth";
import { handler } from "../auth/register/actions";

export default async function Dashboard() {
  const cookie = await verifySession();
  const session = await handler();
  // console.log("SESSION IN DASHBOARD");
  // console.log(session);
  // if (!session) {
  //   redirect("/auth/login");
  // }
  return (
    <div>
      Welcome to the dashboard, User ID:{" "}
      {cookie?.user?.email || "Not logged in"}
    </div>
  );
}
