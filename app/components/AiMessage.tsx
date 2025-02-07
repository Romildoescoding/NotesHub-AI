import { Check, Copy } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const AiMessage = ({ text }) => {
  const [copied, setIsCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000);
    }
  }, [copied]);

  return (
    <div className="h-fit items-end w-full flex gap-3">
      <Image
        src="/App_Logo.png"
        height={24}
        width={24}
        alt="user-image"
        className="rounded-full border-2"
      />
      {text.length > 0 ? (
        <span className="h-fit w-full max-w-[40vw] ai-message relative ">
          {text}
          {copied ? (
            <span className="absolute bottom-2 right-2 p-1 transition-all rounded-md text-zinc-900">
              <Check size={15} />
            </span>
          ) : (
            <span
              onClick={() => {
                navigator.clipboard.writeText(text);
                setIsCopied(true);
              }}
              className="absolute cursor-pointer bottom-2 right-2 p-1 transition-all rounded-md text-zinc-900 hover:bg-zinc-200"
            >
              <Copy size={15} />
            </span>
          )}
        </span>
      ) : (
        <Spinner isWhite={false} height={24} width={24} />
      )}
    </div>
  );
};

export default AiMessage;
