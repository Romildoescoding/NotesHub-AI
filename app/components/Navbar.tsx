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
import ProfileButton from "./ProfileButton";

const Navbar = async () => {
  const user = await getUser();
  return (
    <>
      <div className="h-[61px] relative w-[calc(100vw-90px)]">
        <nav className="fixed z-[999] pt-1 left-[88px] flex flex-col bg-zinc-400 gap-2 w-[calc(100vw-90px)] h-fit text-zinc-900 items-center pointer-events-none">
          <div className="rounded-tl-xl border-b-2 border-black pointer-events-auto relative bg-white w-[calc(100vw-90px)] h-full bg-yellow flex justify-end items-start pr-4 z-[2] transition-all">
            <div className="flex items-center gap-4 h-1/2 py-2">
              <ProfileButton user={user} />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
