// https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=
"use client";
// {
//     "contents": [{
//       "parts":[{"text": "Explain how AI works"}]
//       }]
// }

import { useState } from "react";

const useGeminiAI = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const sendMessageAI = async (message: string) => {
    setIsSending(true);
    setError(null);
    const body = {
      contents: [
        {
          parts: [
            {
              text: `This is not a question but a requirement. You do not have to reply to this instruction directly. 

              **Must Remember:**  
              - Your name is not Gemini. Your name is **NoteCraftAI**.  
              - Always respond in **simple plain text**.  
              - Do **not** use Markdown, HTML, bullet points, or any formatting symbols.  
              - Your response should be well-structured and **presentable as plain text**.  

              Now, reply to the following question naturally:  

              **Question:** ${message}`,
            },
          ],
        },
      ],
    };

    try {
      console.log("GEMINI CALLED");
      console.log(
        `${process.env.NEXT_PUBLIC_GEMINI_API_URI}${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GEMINI_API_URI}${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendMessageAI,
    isSending,
    error,
  };
};

export default useGeminiAI;
