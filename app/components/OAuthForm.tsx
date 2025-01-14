import { signIn } from "@/auth";
import React from "react";
import Github from "./svgs/Github";
import Google from "./svgs/Google";
// import { signInViaOAuth } from "../auth/register/actions";

const OAuthForm = () => {
  return (
    <>
      {/* GOOGLE SIGN-IN BUTTON */}
      <form
        className="w-full"
        action={async () => {
          "use server";
          // await signInViaOAuth("google");
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          className="text-sm text-zinc-600 font-[500] py-1 items-center justify-center gap-2 flex border-2 rounded-md w-full border-zinc-200"
        >
          <Google height={20} width={20} />
          <span>Google</span>
        </button>
      </form>
      {/* GITHUB SIGN-IN BUTTON */}
      <form
        className="w-full"
        action={async () => {
          "use server";
          //   await signIn("github", { redirectTo: "/dashboard" });
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          className="text-sm text-zinc-600 font-[500] py-1 items-center justify-center gap-2 flex border-2 rounded-md w-full border-zinc-200"
        >
          <Github height={20} width={20} />
          <span>Github</span>
        </button>
      </form>
    </>
  );
};

export default OAuthForm;
