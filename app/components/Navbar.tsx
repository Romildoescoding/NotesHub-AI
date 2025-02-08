// "use client";
import React from "react";
import { getUser } from "../_data/user";
import ProfileButton from "./ProfileButton";
import { useCurrentUser } from "../auth/useCurrentUser";

const Navbar = async () => {
  const user = await getUser();
  // const Navbar = () => {
  //   const { user } = useCurrentUser();
  //   console.log(user);
  return (
    <>
      <div className="h-[61px] relative w-[calc(100vw-90px)]">
        <nav className="fixed z-[999] pt-1 left-[88px] flex flex-col bg-zinc-400 gap-2 w-[calc(100vw-90px)] h-fit text-zinc-900 items-center pointer-events-none">
          <div className="rounded-tl-xl border-b-2 border-zinc-100 pointer-events-auto relative bg-white w-[calc(100vw-90px)] h-full bg-yellow flex justify-end items-start pr-4 z-[2] transition-all">
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
