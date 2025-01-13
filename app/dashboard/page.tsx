import { redirect } from "next/navigation";
import { verifySession } from "../_lib/session";

export default async function Dashboard() {
  const session = await verifySession();
  // if (!session) {
  //   redirect("/auth/login");
  // }
  return (
    <div>
      Welcome to the dashboard, User ID: {session?.userId || "Not logged in"}
    </div>
  );
}
