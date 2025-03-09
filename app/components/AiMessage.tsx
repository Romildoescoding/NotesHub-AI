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
      <div className="w-[24px] h-[24px] flex items-center justify-center rounded-full border-2">
        <Image
          src="/logo_notecraft.svg"
          height={16}
          width={16}
          alt="user-image"
          // className=""
        />
      </div>
      {text.length > 0 ? (
        <span className="h-fit w-full max-w-[60vw] min-[600px]:max-w-[55vw] min-[1000px]:max-w-[40vw] ai-message relative text-sm min-[600px]:text-base">
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
