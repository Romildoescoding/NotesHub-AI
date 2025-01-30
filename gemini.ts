To adapt your way of communicating with Gemini (using the useGeminiAI hook and your environment variables) for processing PDF files, you'll need to:

1. Modify your sendMessageAI method to handle a Buffer of the PDF data in Base64 format.
2. Incorporate the required structure from the Gemini documentation for inline data (inlineData) to send the PDF data and query.

Here’s how you can modify your implementation:

### Updated useGeminiAI Hook for PDF Processing

typescript
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
          inlineData: {
            data: Buffer.from(pdfBuffer).toString("base64"), // Convert PDF buffer to Base64
            mimeType: "application/pdf",
          },
        },
        prompt, // Add your prompt for Gemini to process the PDF
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
        throw new Error(`Failed to process PDF: ${response.statusText}`);
      }

      const data = await response.json();
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

export default useGeminiAI;


---

### How to Use the Hook for PDF Processing

Here’s an example of how to use this updated useGeminiAI hook in your component:

tsx
import React, { useState } from "react";
import useGeminiAI from "./useGeminiAI";

const ProcessPdf = () => {
  const { sendMessageAI, isSending, error } = useGeminiAI();
  const [pdfUrl, setPdfUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleProcessPdf = async () => {
    try {
      const pdfResponse = await fetch(pdfUrl);
      const pdfBuffer = await pdfResponse.arrayBuffer();

      const response = await sendMessageAI(pdfBuffer, "Summarize this document");
      setResult(response);
    } catch (err) {
      console.error("Error fetching or processing PDF:", err);
    }
  };

  return (
    <div>
      <h1>Process PDF with Gemini</h1>
      <input
        type="text"
        placeholder="Enter PDF URL"
        value={pdfUrl}
        onChange={(e) => setPdfUrl(e.target.value)}
      />
      <button onClick={handleProcessPdf} disabled={isSending}>
        {isSending ? "Processing..." : "Process PDF"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default ProcessPdf;


---

### Key Changes
1. *PDF Data in Base64:* The pdfBuffer is converted into Base64 format using Buffer.from(pdfBuffer).toString("base64").
2. *Prompt Integration:* The prompt is passed along with the PDF data for processing.
3. *Error Handling and State Management:* Errors and API responses are handled using useState.

This implementation aligns with your preferred way of interacting with Gemini while allowing you to process PDF files effectively. Let me know if you need additional adjustments!