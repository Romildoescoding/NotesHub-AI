// import { redirect } from "next/navigation";
// import { verifySession } from "../../_lib/session";
// import { auth } from "@/auth";
// import { handler } from "../../auth/register/actions";
// import { getUser } from "../../_data/user";

import { getUser } from "@/app/_data/user";
import { verifySession } from "@/app/_lib/session";
import { handler } from "@/app/auth/register/actions";
import { BarChartCard } from "@/app/components/BarChartCard";
import { ChartCard } from "@/app/components/ChartCard";
import DashboardChats from "@/app/components/DashboardChats";
import DashboardNotes from "@/app/components/DashboardNotes";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  await verifySession();
  await handler();
  const user = await getUser();
  // console.log(user);
  // console.log("SESSION IN DASHBOARD");
  // console.log(session);
  // if (!session) {
  //   redirect("/auth/login");
  // }
  return (
    <div className=" text-zinc-900 flex gap-4 h-fit p-6 pt-4 pb-4 w-full">
      <div className="w-full h-fit flex items-center flex-col gap-4">
        <div className="rounded-lg max-h-fit border-[1px] flex flex-col gap-2 p-6 w-full max-w-sm">
          <span className="text-2xl font-semibold">
            Welcome Back, <span className="font-bold">{user.name}</span>
          </span>
          <span className="text-zinc-500 text-sm">
            Get started by navigating from the sidebar or select an option on
            the dashboard.
          </span>
        </div>

        <DashboardNotes />

        <div className="rounded-lg max-h-fit border-[1px] flex flex-col gap-1 p-6 w-full max-w-sm">
          <CardTitle className="text-xl">Total Notes</CardTitle>
          <CardDescription>
            The number of notes you have exported till date.
          </CardDescription>
          <h1 className="w-full flex text-3xl font-bold">
            {Number(1322).toLocaleString()} notes
          </h1>
        </div>
      </div>

      <div className="w-full h-fit flex items-center flex-col gap-4">
        <div className="min-w-md w-full h-fit flex flex-col gap-4 max-w-md">
          <ChartCard />
        </div>

        <DashboardChats />
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        <div className="rounded-lg max-h-fit border-[1px] flex flex-col gap-2 p-6 w-full max-w-sm">
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Access the main features via these buttons.
          </CardDescription>
          <Link
            href="/notes/uploads"
            className="w-full flex items-center justify-center p-2 font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-lg transition-all"
          >
            Upload Notes
          </Link>
          <Link
            href="/notes/editor"
            className="w-full flex items-center justify-center p-2 font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-lg transition-all"
          >
            Access Editor
          </Link>
          <Link
            href="/ai/chat"
            className="w-full flex items-center justify-center p-2 font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-lg transition-all"
          >
            Chat with AI
          </Link>
        </div>

        <div className="min-w-md w-full h-fit flex flex-col gap-4 max-w-md">
          <BarChartCard />
        </div>

        {/* <div className="rounded-lg max-h-fit border-[1px] flex flex-col gap-2 p-6 w-full max-w-sm">
          <CardTitle>Quick Chat</CardTitle>
          <CardDescription>Ask the AI anything.</CardDescription>
          <input
            type="text"
            className="rounded-md border-[1px] text-sm placeholder:text-zinc-300 p-2"
            placeholder="Type Message.."
          />
        </div> */}
      </div>
      {/* Welcome to the dashboard, User ID: {user.name || "Not logged in"} */}
    </div>
  );
}

// import { verifySession } from "../../_lib/session";
// import { handler } from "../../auth/register/actions";
// import { getUser } from "../../_data/user";

// export default async function Dashboard() {
//   try {
//     await verifySession();
//     await handler();
//     const user = await getUser();

//     return (
//       <div>
//         Welcome to the dashboard, User ID: {user?.name || "Not logged in"}
//       </div>
//     );
//   } catch (error) {
//     console.error("Error loading dashboard:", error);
//     return <div>Something went wrong. Please try again later.</div>;
//   }
// }
