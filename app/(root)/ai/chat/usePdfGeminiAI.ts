import { useState } from "react";

const usePdfGeminiAI = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const sendPDfMessageAI = async (pdfBuffer: ArrayBuffer, prompt: string) => {
    setIsSending(true);
    setError(null);

    const body = {
      contents: [
        {
          role: "user", // ✅ Required Role
          parts: [
            {
              inlineData: {
                data: Buffer.from(pdfBuffer).toString("base64"), // Convert PDF buffer to Base64
                mimeType: "application/pdf",
              },
            },
          ],
        },
        {
          role: "user", // ✅ Required Role
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
              
              **Question:** ${prompt}`,
            },
          ], // The user's question related to the PDF
        },
      ],
    };

    //Normal way of asking questions...
    // const body = {
    //   contents: [
    //     {
    //       parts: [
    //         {
    //           inlineData: {
    //             data: Buffer.from(pdfBuffer).toString("base64"), // Convert PDF buffer to Base64
    //             mimeType: "application/pdf",
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       parts: [{ text: prompt }], // Your question based on the PDF
    //     },
    //   ],
    // };

    //The way to upload files in the gemini api and ask questions right....
    // const body = {
    //   contents: [
    //     {
    //       inlineData: {
    //         data: Buffer.from(pdfBuffer).toString("base64"), // Convert PDF buffer to Base64
    //         mimeType: "application/pdf",
    //       },
    //     },
    //     prompt,
    //   ],
    // };

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

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(`Failed to process PDF: ${response.statusText}`);
      }

      console.log("GEMINI DATA RETURNED");
      console.log(data);
      return data; // Return the processed response
    } catch (err) {
      setError(err.message);
      console.error("Error processing PDF:", err);
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendPDfMessageAI,
    isSending,
    error,
  };
};

export default usePdfGeminiAI;
