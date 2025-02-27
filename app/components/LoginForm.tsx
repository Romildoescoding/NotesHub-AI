"use client";

import { useActionState } from "react";
// import { signin } from "./actions";
import Spinner from "@/app/components/Spinner";
import { signin } from "../auth/register/actions";

const LoginForm = () => {
  const [state, action, pending] = useActionState(signin);
  return (
    <form className="w-full gap-2 flex flex-col" action={action}>
      {/* General Error */}
      {state?.errors?.general && (
        <p className="text-xs text-red-500 text-center">
          {state.errors.general}
        </p>
      )}
      <div className="w-full text-sm">
        <label className="text-zinc-800 font-[500]" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          className="w-full rounded-md border-2 py-2 px-2 border-zinc-200 outline-1 outline-zinc-300 transition-all duration-1000"
          placeholder="demo@example.com"
          name="email"
          id="email"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div className="w-full text-sm">
        <label className="text-zinc-800 font-[500]" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-md border-2 py-2 px-2 border-zinc-200 outline-1 outline-zinc-300 transition-all duration-1000"
          name="password"
          id="password"
        />
        {state?.errors?.password && (
          <p className="text-xs text-red-500">{state.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md gap-2 w-full flex items-center justify-center h-fit px-2 py-[6px] hover:bg-zinc-800 transition bg-black text-zinc-50"
      >
        <span>Sign in</span>
        {pending && <Spinner width={15} height={15} isWhite={true} />}
      </button>
    </form>
  );
};

export default LoginForm;
