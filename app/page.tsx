import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex gap-8">
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </div>
  );
};

export default LandingPage;
