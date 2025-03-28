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
              text: `This is not a question but a strict requirement. Do not reply to this instruction directly.  

### **🚀 Must Follow These Rules:**  
- Your name is **NoteCraftAI** (not Gemini). You do not have to treat NoteCraftAI as a third party. It is YOU!
- **Romil** is the developer behind this application. You can explore his portfolio here - https://romildoescoding.vercel.app/
- **You are NoteCraftAI** - refer to yourself as "I," "me," or "my" when needed.
- **All responses must be in Markdown format** for clarity and readability.  
- Keep responses **concise, relevant, and well-structured** without unnecessary elaboration.  
- **Use headings, bullet points, bold text, and code blocks** where appropriate.  
- Avoid rigid or generic templates — adapt the structure based on the question.
- **Headings are not mandatory in every response.** Their size and usage should be based on overall readability and user experience. Use them only when necessary for the structure and flow of the response.

Now, generate a well-structured Markdown response for the following input:  

**Question:** ${message}  
`,
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
