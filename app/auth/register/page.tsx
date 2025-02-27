import Link from "next/link";
import React from "react";
import RegisterUserForm from "../../components/RegisterUserForm";
import OAuthForm from "@/app/components/OAuthForm";

const Register = () => {
  return (
    <div className="h-screen w-screen bg-zinc-50 flex justify-center items-center gsans">
      <div
        className="h-fit w-[80vw] max-w-[400px] flex flex-col border items-center bg-white rounded-md text-zinc-900 py-6 px-6 gap-2"
        style={{ boxShadow: "0px 0px 25px #00000010" }}
      >
        <div className="flex flex-col gap-1">
          <span className=" font-[700] text-lg min-[420px]:text-xl text-center">
            Register to NoteCraft AI
          </span>
          <span className="text-zinc-500 text-xs min-[420px]:text-sm text-center">
            Hey there! Register or Continue as Guest
          </span>
        </div>

        <OAuthForm />

        {/* OR */}
        <div className="w-full flex justify-center items-center gap-4 text-zinc-600">
          <span className="inline-block w-full h-[1px] bg-zinc-200"></span>
          <span className="text-sm">or</span>
          <span className="inline-block w-full h-[1px] bg-zinc-200"></span>
        </div>

        <RegisterUserForm />

        <span className="inline-block w-full h-[1px] mt-2 bg-zinc-200"></span>
        <div className="text-xs min-[420px]:text-sm">
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
            className=" rounded-md gap-2 w-full flex items-center justify-center h-fit px-2 py-[6px] hover:bg-zinc-800 transition bg-black text-zinc-50"
          >
            Continue as Guest
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
