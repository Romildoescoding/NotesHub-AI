"use client";
import { useSidebar } from "@/app/context/SidebarContext";
import React from "react";

const Profile = () => {
  const { collapsed, setIsCollapsed } = useSidebar();
  return (
    <div
      className={` ${
        !collapsed ? "pl-6 min-[600px]:pl-32" : "pl-6"
      } transition-all duration-300`}
    >
      Profile Profile
    </div>
  );
};

export default Profile;
