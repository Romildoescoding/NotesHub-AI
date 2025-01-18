import Link from "next/link";
import React from "react";
import AnimatedLogoLoader from "./components/AnimatedLogoLoader";

const LandingPage = () => {
  return (
    <div className="flex gap-8">
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
      <AnimatedLogoLoader />
    </div>
  );
};

export default LandingPage;
