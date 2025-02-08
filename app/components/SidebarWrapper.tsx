"use client";
import React from "react";

import { SidebarProvider } from "../context/SidebarContext";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default SidebarWrapper;
