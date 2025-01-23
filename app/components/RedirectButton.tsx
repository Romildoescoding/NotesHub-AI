import { redirect } from "next/navigation";
import React from "react";

const RedirectButton = () => {
  return (
    <form
      action={() => {
        // "use server";
        redirect("/dashboard/list");
      }}
    >
      <button type="submit" className="p-2 px-4 bg-zinc-900 text-zinc-50">
        View Uploaded Notes!
      </button>
    </form>
  );
};

export default RedirectButton;
