// import { redirect } from "next/navigation";
// import { verifySession } from "../../_lib/session";
// import { auth } from "@/auth";
// import { handler } from "../../auth/register/actions";
// import { getUser } from "../../_data/user";

import { getUser } from "@/app/_data/user";
import { verifySession } from "@/app/_lib/session";
import { handler } from "@/app/auth/register/actions";
import DashboardComponent from "@/app/components/DashboardComponent";

export default async function Dashboard() {
  await verifySession();
  await handler();
  const user = await getUser();
  // console.log(user);
  // console.log("SESSION IN DASHBOARD");
  // console.log(session);
  // if (!session) {
  //   redirect("/auth/login");
  // const {collapsed, setIsCollapsed} = useSidebar();
  // }
  return <DashboardComponent user={user} />;
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
