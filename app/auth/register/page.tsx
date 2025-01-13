import Github from "@/app/components/svgs/Github";
import Google from "@/app/components/svgs/Google";
import Link from "next/link";
import React from "react";
import { signIn } from "@/auth";
import RegisterUserForm from "../../components/RegisterUserForm";

const Register = () => {
  return (
    <div className="h-screen w-screen bg-zinc-100 flex justify-center items-center gsans">
      <div
        className="h-fit w-[80vw] max-w-[400px] flex flex-col items-center bg-zinc-50 rounded-md text-zinc-900 py-6 px-3 gap-2"
        style={{ boxShadow: "0px 0px 25px #00000015" }}
      >
        <div className="flex flex-col gap-1">
          <span className=" font-[700] text-center">
            Register to NotesHub AI
          </span>
          <span className="text-zinc-500 text-xs text-center">
            Hey there! Register or Continue as Guest
          </span>
        </div>

        {/* GOOGLE SIGN-IN BUTTON */}
        <form
          className="w-full"
          action={async () => {
            "use server";
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

        {/* OR */}
        <div className="w-full flex justify-center items-center gap-4 text-zinc-600">
          <span className="inline-block w-full h-[1px] bg-zinc-200"></span>
          <span className="text-sm">or</span>
          <span className="inline-block w-full h-[1px] bg-zinc-200"></span>
        </div>

        <RegisterUserForm />

        <span className="inline-block w-full h-[1px] mt-2 bg-zinc-200"></span>
        <div className="text-xs">
          <span className="text-zinc-500">{"Already have an account? "}</span>
          <Link href="/auth/login" className="font-[500]">
            Sign in
          </Link>
        </div>

        {/* OR */}
        <div className="w-full flex justify-center items-center gap-4 text-zinc-600">
          <span className="inline-block w-full h-[1px] bg-zinc-200"></span>
          <span className="text-sm">or</span>
          <span className="inline-block w-full h-[1px] bg-zinc-200"></span>
        </div>

        <form
          className="w-full"
          action={async () => {
            "use server";
            console.log();
          }}
        >
          <button
            type="submit"
            className="text-sm text-zinc-100 bg-zinc-800 hover:bg-zinc-700 py-1 items-center justify-center gap-2 flex border-2 rounded-md w-full border-zinc-200 transition-all"
          >
            Continue as Guest
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
