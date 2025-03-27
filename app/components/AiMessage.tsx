import { Check, Copy } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  h1: ({ node, ...props }) => (
    <h1 className="text-2xl font-bold my-2" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-xl font-semibold my-2" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-lg font-semibold my-2" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="text-base font-medium my-2" {...props} />
  ),
  h5: ({ node, ...props }) => (
    <h5 className="text-sm font-medium my-2" {...props} />
  ),
  h6: ({ node, ...props }) => (
    <h6 className="text-xs font-medium my-2" {...props} />
  ),

  p: ({ node, ...props }) => (
    <p className="text-base leading-6 my-2" {...props} />
  ),

  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
  em: ({ node, ...props }) => <em className="italic" {...props} />,
  del: ({ node, ...props }) => <del className="line-through" {...props} />,

  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside my-2" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside my-2" {...props} />
  ),
  li: ({ node, ...props }) => <li className="ml-4 my-1" {...props} />,

  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-4 border-zinc-500 pl-4 italic my-2"
      {...props}
    />
  ),

  a: ({ node, ...props }) => (
    <a
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  hr: ({ node, ...props }) => (
    <hr className="border-t border-zinc-300 my-4" {...props} />
  ),

  pre: ({ node, ...props }) => (
    <pre className="text-black rounded-md overflow-x-auto" {...props} />
  ),

  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        style={ghcolors} // Try `dracula`, `materialDark`, or `vs2015`
        language={match[1]}
        PreTag="div"
        className="rounded-lg"
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    ) : (
      <code {...props}>{children}</code>
    );
  },
};

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
          src="/App_Logo.svg"
          height={24}
          width={24}
          alt="user-image"
          // className=""
        />
      </div>
      {text.length > 0 ? (
        <span className="h-fit w-full flex flex-col max-w-[65vw] min-[600px]:max-w-[55vw] min-[1000px]:max-w-[40vw] ai-message relative text-sm min-[600px]:text-base prose prose-zinc dark:prose-invert">
          {/* Render Markdown */}
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {text}
          </ReactMarkdown>

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
