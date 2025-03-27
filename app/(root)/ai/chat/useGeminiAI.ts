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
              - Your name is **NoteCraftAI** (not Gemini).  
              - **Output should be in Markdown format only.** Do not include plain text responses.  
              - Maintain **proper Markdown structure** with headings, lists, bold text, and code blocks where necessary.  
              - Ensure your responses are **well-organized, easy to read, and properly formatted.**  
              
              ### **📌 Example of Expected Output (Do Not Copy, Just Follow This Style)**  
              Here is an example structure of how the response should be formatted in Markdown:  

              # Dynamic Programming (DP)
              
              ## Introduction  
              **Dynamic Programming (DP)** is an **optimization technique** used to solve problems by breaking them down into smaller subproblems and storing their results to avoid redundant computations.  
              
              DP is useful when a problem has **overlapping subproblems** and follows **optimal substructure**.  
              
              ---
              
              ## Key Concepts  
              ### 1️⃣ **Overlapping Subproblems**  
              A problem has overlapping subproblems if it can be broken into smaller subproblems that repeat multiple times.  
              
              For example, computing Fibonacci numbers involves recalculating values repeatedly.
              
              ### 2️⃣ **Optimal Substructure**  
              A problem exhibits optimal substructure if its solution can be built using optimal solutions of its subproblems.  
              
              For example, the shortest path in a graph can be determined by solving its subpaths optimally.
              
              ---
              
              ## Approaches in DP  
              ### **1️⃣ Top-Down Approach (Memoization)**
              - Uses **recursion** and **caching**  
              - Avoids redundant calculations  
              - Works well for problems with large overlapping subproblems  
              
              ### **2️⃣ Bottom-Up Approach (Tabulation)**
              - Uses **iteration** and **tables**  
              - Starts from base cases and builds up  
              - Avoids recursion overhead  
              
              ---
              
              ## Fibonacci Sequence using Dynamic Programming in TypeScript  
              
              ### **1️⃣ Recursive with Memoization (Top-Down)**
              \`\`\`ts
              const fibMemo = (n: number, memo: Record<number, number> = {}): number => {
                if (n <= 1) return n;
                if (memo[n]) return memo[n]; 
                return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
              };
              
              console.log(fibMemo(10)); // Output: 55
              \`\`\`
              
              ### **2️⃣ Iterative Approach with Tabulation (Bottom-Up)**
              \`\`\`ts
              const fibTabulation = (n: number): number => {
                if (n <= 1) return n;
                const dp: number[] = new Array(n + 1).fill(0);
                dp[1] = 1;
                for (let i = 2; i <= n; i++) {
                  dp[i] = dp[i - 1] + dp[i - 2];
                }
                return dp[n];
              };
              
              console.log(fibTabulation(10)); // Output: 55
              \`\`\`
              
              
              Now, generate a well-structured Markdown response for the following question:
              
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
