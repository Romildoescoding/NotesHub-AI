// import Link from "next/link";
// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="fixed flex gap-4 top-6 h-18 px-2 py-2 w-fit bg-zinc-100 left-1/2  -translate-x-1/2 text-zinc-900 --font-giest-sans rounded-md border-[2px] border-[#ededed]">
//       <Link href="/" className=" capitalize  rounded-md p-2">
//         Home
//       </Link>
//       <Link
//         href="/notes"
//         className=" capitalize bg-zinc-800 text-zinc-100 rounded-md p-2"
//       >
//         Notes
//       </Link>

//       <Link href="/notes" className=" capitalize  rounded-md p-2">
//         Study Rooms
//       </Link>

//       <button className=" cursor-pointer">Logout</button>
//     </nav>
//   );
// };

// export default Navbar;

import Link from "next/link";
import React from "react";
import { getUser } from "../_data/user";
import Image from "next/image";
import FloatingNavbar from "./FloatingNavbar";

const Navbar = async () => {
  const user = await getUser();
  return (
    <nav className="fixed z-[9999] top-0 left-0 flex flex-col bg-gradient-to-b from-white via-[#ffffffef] to-[#ffffff00] gap-2 w-full h-fit text-zinc-900 items-center pointer-events-none">
      <div
        className="pointer-events-auto relative w-full h-24 flex justify-between items-start pt-2 pl-2 pr-4 z-[2] transition-all"
        // style={{
        //   background: "linear-gradient(to bottom, white 0%, transparent 100%)",
        // }}
      >
        {/* <div className="w-full absolute z-[9999999] h-7 left-0 top-0 bg-gradient-to-b from-white via-white to-[#ffffff90]"></div>
        <div className="w-full absolute z-[9999999] h-7 left-0 bottom-0 bg-gradient-to-b from-[#ffffff90] via-[#ffffff30] to-transparent"></div> */}
        <Link href="/">
          <Image
            src={"/App_Logo.svg"}
            width={60}
            height={60}
            alt="avatar"
            className=" antialiased"
          />
        </Link>

        <div className="flex items-center gap-4 h-1/2 pt-4">
          {/* <button className="flex gap-2 cursor-pointer p-2 bg-zinc-800 rounded-full text-zinc-50">
            Logout
            <Image
              src={"/logout-svg.svg"}
              width={24}
              height={24}
              alt="avatar"
              className=" antialiased"
            />
          </button> */}
          <Link href="/dashboard/profile" className="tooltip">
            <span className="tooltiptext" style={{}}>
              Profile
            </span>
            <Image
              src={user.image}
              width={42}
              height={42}
              alt="avatar"
              className="rounded-full border-[2px] border-[#ededed] hover:border-zinc-200 transition-all"
            />
          </Link>
        </div>
      </div>

      <FloatingNavbar />
    </nav>
  );
};

export default Navbar;
